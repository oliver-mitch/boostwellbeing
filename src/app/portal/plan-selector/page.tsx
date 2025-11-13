'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { FamilyMember } from '@/types/portal';
import PlanSelector from '@/components/portal/PlanSelector';
import FamilyMembers from '@/components/portal/FamilyMembers';
import CostSummary from '@/components/portal/CostSummary';
import { LogOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/portal/login');
    }
  }, [status, router]);

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
    </div>
  );
}
