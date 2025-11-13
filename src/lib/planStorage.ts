import { supabase, PortalUser, UserPlan, FamilyMemberDB } from './supabase';
import { FamilyMember } from '@/types/portal';
import { EMPLOYEE_PLANS } from '@/data/rateData';

export interface SavedPlanSummary {
  id: string;
  planCode: string;
  planName: string;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PlanSelectionData {
  planCode: string;
  familyMembers: FamilyMember[];
}

/**
 * Ensures a portal user exists in the database for the given email
 * Creates one if it doesn't exist
 */
async function ensurePortalUser(email: string, name?: string): Promise<string> {
  // Check if user exists
  const { data: existingUser, error: fetchError } = await supabase
    .from('portal_users')
    .select('id')
    .eq('email', email)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    // PGRST116 is "not found" error
    throw new Error(`Error checking for user: ${fetchError.message}`);
  }

  if (existingUser) {
    return existingUser.id;
  }

  // Create new user
  const { data: newUser, error: createError } = await supabase
    .from('portal_users')
    .insert({ email, name })
    .select('id')
    .single();

  if (createError) {
    throw new Error(`Error creating user: ${createError.message}`);
  }

  if (!newUser) {
    throw new Error('Failed to create user');
  }

  return newUser.id;
}

/**
 * Saves a plan selection to the database
 */
export async function savePlanSelection(
  userEmail: string,
  userName: string | undefined,
  planData: PlanSelectionData
): Promise<string> {
  try {
    // Ensure user exists
    const userId = await ensurePortalUser(userEmail, userName);

    // Find plan name
    const plan = EMPLOYEE_PLANS.find((p) => p.code === planData.planCode);
    const planName = plan?.name || planData.planCode;

    // Create plan record
    const { data: userPlan, error: planError } = await supabase
      .from('user_plans')
      .insert({
        user_id: userId,
        plan_code: planData.planCode,
        plan_name: planName,
      })
      .select('id')
      .single();

    if (planError) {
      throw new Error(`Error saving plan: ${planError.message}`);
    }

    if (!userPlan) {
      throw new Error('Failed to save plan');
    }

    // Save family members
    const familyMembersData = planData.familyMembers.map((member) => ({
      plan_id: userPlan.id,
      name: member.name,
      age: member.age,
      is_employee: member.isEmployee,
      selected_modules: member.selectedModules,
    }));

    const { error: membersError } = await supabase
      .from('family_members')
      .insert(familyMembersData);

    if (membersError) {
      // Rollback plan creation if family members fail
      await supabase.from('user_plans').delete().eq('id', userPlan.id);
      throw new Error(`Error saving family members: ${membersError.message}`);
    }

    return userPlan.id;
  } catch (error) {
    console.error('Error saving plan selection:', error);
    throw error;
  }
}

/**
 * Loads all saved plan selections for a user
 */
export async function loadUserPlanSelections(
  userEmail: string
): Promise<SavedPlanSummary[]> {
  try {
    // Get user ID
    const { data: user, error: userError } = await supabase
      .from('portal_users')
      .select('id')
      .eq('email', userEmail)
      .single();

    if (userError || !user) {
      return []; // User doesn't exist yet or has no plans
    }

    // Get all plans for this user
    const { data: plans, error: plansError } = await supabase
      .from('user_plans')
      .select('id, plan_code, plan_name, created_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (plansError) {
      throw new Error(`Error loading plans: ${plansError.message}`);
    }

    if (!plans || plans.length === 0) {
      return [];
    }

    // Get member counts for each plan
    const planSummaries: SavedPlanSummary[] = await Promise.all(
      plans.map(async (plan) => {
        const { count, error: countError } = await supabase
          .from('family_members')
          .select('*', { count: 'exact', head: true })
          .eq('plan_id', plan.id);

        if (countError) {
          console.error(`Error counting members for plan ${plan.id}:`, countError);
        }

        return {
          id: plan.id,
          planCode: plan.plan_code,
          planName: plan.plan_name || plan.plan_code,
          memberCount: count || 0,
          createdAt: plan.created_at,
          updatedAt: plan.updated_at,
        };
      })
    );

    return planSummaries;
  } catch (error) {
    console.error('Error loading plan selections:', error);
    throw error;
  }
}

/**
 * Loads a specific plan selection by ID
 */
export async function loadPlanSelection(
  planId: string
): Promise<PlanSelectionData | null> {
  try {
    // Get plan details
    const { data: plan, error: planError } = await supabase
      .from('user_plans')
      .select('plan_code')
      .eq('id', planId)
      .single();

    if (planError || !plan) {
      throw new Error(`Error loading plan: ${planError?.message || 'Plan not found'}`);
    }

    // Get family members
    const { data: members, error: membersError } = await supabase
      .from('family_members')
      .select('*')
      .eq('plan_id', planId)
      .order('created_at', { ascending: true });

    if (membersError) {
      throw new Error(`Error loading family members: ${membersError.message}`);
    }

    if (!members || members.length === 0) {
      throw new Error('No family members found for this plan');
    }

    // Convert to FamilyMember format
    const familyMembers: FamilyMember[] = members.map((member, index) => ({
      id: (index + 1).toString(), // Use sequential IDs for the UI
      name: member.name,
      age: member.age,
      isEmployee: member.is_employee,
      selectedModules: Array.isArray(member.selected_modules)
        ? member.selected_modules
        : [],
    }));

    return {
      planCode: plan.plan_code,
      familyMembers,
    };
  } catch (error) {
    console.error('Error loading plan selection:', error);
    throw error;
  }
}

/**
 * Deletes a saved plan selection
 */
export async function deletePlanSelection(planId: string): Promise<void> {
  try {
    // Delete plan (family members will be cascade deleted)
    const { error } = await supabase.from('user_plans').delete().eq('id', planId);

    if (error) {
      throw new Error(`Error deleting plan: ${error.message}`);
    }
  } catch (error) {
    console.error('Error deleting plan selection:', error);
    throw error;
  }
}

/**
 * Updates an existing plan selection
 */
export async function updatePlanSelection(
  planId: string,
  planData: PlanSelectionData
): Promise<void> {
  try {
    // Find plan name
    const plan = EMPLOYEE_PLANS.find((p) => p.code === planData.planCode);
    const planName = plan?.name || planData.planCode;

    // Update plan record
    const { error: planError } = await supabase
      .from('user_plans')
      .update({
        plan_code: planData.planCode,
        plan_name: planName,
      })
      .eq('id', planId);

    if (planError) {
      throw new Error(`Error updating plan: ${planError.message}`);
    }

    // Delete existing family members
    const { error: deleteError } = await supabase
      .from('family_members')
      .delete()
      .eq('plan_id', planId);

    if (deleteError) {
      throw new Error(`Error deleting old family members: ${deleteError.message}`);
    }

    // Insert new family members
    const familyMembersData = planData.familyMembers.map((member) => ({
      plan_id: planId,
      name: member.name,
      age: member.age,
      is_employee: member.isEmployee,
      selected_modules: member.selectedModules,
    }));

    const { error: membersError } = await supabase
      .from('family_members')
      .insert(familyMembersData);

    if (membersError) {
      throw new Error(`Error saving updated family members: ${membersError.message}`);
    }
  } catch (error) {
    console.error('Error updating plan selection:', error);
    throw error;
  }
}
