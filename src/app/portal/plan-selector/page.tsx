'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { FamilyMember } from '@/types/portal';
import PlanSelector from '@/components/portal/PlanSelector';
import FamilyMembers from '@/components/portal/FamilyMembers';
import CostSummary from '@/components/portal/CostSummary';
import { LogOut, ArrowLeft, Save, FolderOpen, Trash2, X, Check } from 'lucide-react';
import Link from 'next/link';
import {
  savePlanSelection,
  loadUserPlanSelections,
  loadPlanSelection,
  deletePlanSelection,
  SavedPlanSummary,
} from '@/lib/planStorage';
import { isSupabaseConfigured } from '@/lib/supabase';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function PlanSelectorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // State management
  const [selectedPlan, setSelectedPlan] = useState('wb_1_500');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Primary Member',
      age: 30,
      isEmployee: true,
      selectedModules: [],
    },
  ]);
  const [activeMemberId, setActiveMemberId] = useState('1');

  // Save/Load state
  const [savedPlans, setSavedPlans] = useState<SavedPlanSummary[]>([]);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/portal/login');
    }
  }, [status, router]);

  // Load saved plans when user is authenticated
  useEffect(() => {
    if (session?.user?.email) {
      loadSavedPlans();
    }
  }, [session]);

  // Load saved plans from database
  const loadSavedPlans = async () => {
    if (!session?.user?.email) return;

    try {
      const plans = await loadUserPlanSelections(session.user.email);
      setSavedPlans(plans);
    } catch (error) {
      console.error('Error loading saved plans:', error);
    }
  };

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

  const activeMember = familyMembers.find((m) => m.id === activeMemberId) || null;

  // Handler functions
  const handleAddMember = () => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: `Family Member ${familyMembers.length + 1}`,
      age: 25,
      isEmployee: false,
      selectedModules: [],
    };
    setFamilyMembers([...familyMembers, newMember]);
    setActiveMemberId(newMember.id);
  };

  const handleDeleteMember = (id: string) => {
    if (familyMembers.length <= 1) return;

    setFamilyMembers(familyMembers.filter((m) => m.id !== id));

    // If deleting active member, select first remaining member
    if (id === activeMemberId) {
      const remaining = familyMembers.filter((m) => m.id !== id);
      if (remaining.length > 0) {
        setActiveMemberId(remaining[0].id);
      }
    }
  };

  const handleUpdateMember = (id: string, updates: Partial<FamilyMember>) => {
    setFamilyMembers(
      familyMembers.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const handleModuleToggle = (moduleCode: string) => {
    if (!activeMember) return;

    const currentModules = activeMember.selectedModules;
    const newModules = currentModules.includes(moduleCode)
      ? currentModules.filter((code) => code !== moduleCode)
      : [...currentModules, moduleCode];

    handleUpdateMember(activeMember.id, { selectedModules: newModules });
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/portal/login' });
  };

  // Save plan selection
  const handleSavePlan = async () => {
    if (!session?.user?.email) {
      setErrorMessage('You must be logged in to save plans');
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      await savePlanSelection(
        session.user.email,
        session.user.name || undefined,
        {
          planCode: selectedPlan,
          familyMembers,
        }
      );

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

      // Reload saved plans
      await loadSavedPlans();
    } catch (error) {
      console.error('Error saving plan:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save plan');
    } finally {
      setIsSaving(false);
    }
  };

  // Load a saved plan
  const handleLoadPlan = async (planId: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const planData = await loadPlanSelection(planId);
      if (planData) {
        setSelectedPlan(planData.planCode);
        setFamilyMembers(planData.familyMembers);
        setActiveMemberId(planData.familyMembers[0]?.id || '1');
        setShowLoadModal(false);
      }
    } catch (error) {
      console.error('Error loading plan:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to load plan');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a saved plan
  const handleDeletePlan = async (planId: string) => {
    if (!confirm('Are you sure you want to delete this saved plan?')) {
      return;
    }

    try {
      await deletePlanSelection(planId);
      await loadSavedPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete plan');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/portal"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Portal</span>
              </Link>
              <div className="border-l pl-4 border-gray-300">
                <h1 className="text-xl font-bold text-gray-900">Health Insurance Plan Selector</h1>
                <p className="text-sm text-gray-600 hidden sm:block">
                  Compare plans and calculate costs
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                <p className="text-xs text-gray-600">{session.user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Plan Selection and Family Members */}
          <div className="lg:col-span-2 space-y-6">
            <PlanSelector
              selectedPlan={selectedPlan}
              onPlanSelect={setSelectedPlan}
              activeMember={activeMember}
              onModuleToggle={handleModuleToggle}
            />
            <FamilyMembers
              members={familyMembers}
              activeMemberId={activeMemberId}
              onMemberSelect={setActiveMemberId}
              onAddMember={handleAddMember}
              onDeleteMember={handleDeleteMember}
              onUpdateMember={handleUpdateMember}
            />
          </div>

          {/* Right Column - Cost Summary */}
          <div className="lg:col-span-1">
            <CostSummary selectedPlan={selectedPlan} members={familyMembers} />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Select Your Plan</h3>
              <p className="text-sm text-gray-600">
                Choose from UltraCare or Wellbeing plans based on your coverage needs.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Add Family Members</h3>
              <p className="text-sm text-gray-600">
                Add all family members who will be covered under the plan.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Customize Modules</h3>
              <p className="text-sm text-gray-600">
                For Wellbeing plans, select optional modules for additional coverage.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3">
        {/* Save Button */}
        <button
          onClick={handleSavePlan}
          disabled={isSaving}
          className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-lg transition-all ${
            saveSuccess
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Save current plan"
        >
          {saveSuccess ? (
            <>
              <Check className="w-5 h-5" />
              <span className="font-medium">Saved!</span>
            </>
          ) : isSaving ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              <span className="font-medium">Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span className="font-medium">Save Plan</span>
            </>
          )}
        </button>

        {/* Load Button */}
        <button
          onClick={() => setShowLoadModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transition-all"
          title="Load saved plan"
        >
          <FolderOpen className="w-5 h-5" />
          <span className="font-medium">Load Plan</span>
          {savedPlans.length > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-white text-gray-700 text-xs rounded-full font-semibold">
              {savedPlans.length}
            </span>
          )}
        </button>
      </div>

      {/* Load Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Load Saved Plan</h2>
              <button
                onClick={() => setShowLoadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4 flex-1 overflow-y-auto">
              {savedPlans.length === 0 ? (
                <div className="text-center py-12">
                  <FolderOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600 mb-2">No saved plans yet</p>
                  <p className="text-sm text-gray-500">
                    Save your current plan selection to access it later
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{plan.planName}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {plan.memberCount} family member{plan.memberCount !== 1 ? 's' : ''}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Saved {new Date(plan.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleLoadPlan(plan.id)}
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => handleDeletePlan(plan.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete plan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {errorMessage && (
        <div className="fixed bottom-8 left-8 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
          <div className="flex-1">{errorMessage}</div>
          <button
            onClick={() => setErrorMessage(null)}
            className="p-1 hover:bg-red-600 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
