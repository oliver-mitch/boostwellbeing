// Portal-specific type definitions for the plan selector

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  isEmployee: boolean;
  selectedModules: string[];
}

export interface PlanSelection {
  planCode: string;
  familyMembers: FamilyMember[];
}
