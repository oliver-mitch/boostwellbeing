'use client';

import { FamilyMember } from '@/types/portal';
import {
  EMPLOYEE_PLANS,
  STANDARD_PLANS,
  EMPLOYEE_MODULES,
  STANDARD_MODULES,
  getRateForAge,
  BASE_RATES,
} from '@/data/rateData';
import { DollarSign, Info, AlertCircle } from 'lucide-react';

interface CostSummaryProps {
  selectedPlan: string;
  members: FamilyMember[];
}

interface MemberCost {
  member: FamilyMember;
  monthlyCost: number;
  isFree: boolean;
  breakdown: {
    baseRate: number;
    planRate: number;
    moduleRates: { code: string; name: string; rate: number }[];
  };
}

export default function CostSummary({ selectedPlan, members }: CostSummaryProps) {
  if (!selectedPlan || members.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Cost Summary</h2>
        <div className="text-center py-8 text-gray-500">
          <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Select a plan and add family members to see costs.</p>
        </div>
      </div>
    );
  }

  // Calculate costs for each member
  const memberCosts: MemberCost[] = members.map((member) => {
    // Find the appropriate plan
    const plan = member.isEmployee
      ? EMPLOYEE_PLANS.find((p) => p.code === selectedPlan)
      : STANDARD_PLANS.find((p) => p.code === selectedPlan + '_standard');

    if (!plan) {
      return {
        member,
        monthlyCost: 0,
        isFree: false,
        breakdown: { baseRate: 0, planRate: 0, moduleRates: [] },
      };
    }

    const isChild = member.age <= 20;
    let baseRate = 0;
    let planRate = 0;
    const moduleRates: { code: string; name: string; rate: number }[] = [];

    // Add base rate only for standard (non-employee) plans
    if (plan.hasAdultChildBase && !plan.isEmployeeRate) {
      baseRate = isChild ? BASE_RATES.child : BASE_RATES.adult;
    }

    // Add plan rate
    planRate = getRateForAge(plan.rates, member.age);

    // Add module rates
    member.selectedModules.forEach((moduleCode) => {
      const moduleList = member.isEmployee ? EMPLOYEE_MODULES : STANDARD_MODULES;
      const module = moduleList.find((m) => m.code === moduleCode);
      if (module) {
        const rate = getRateForAge(module.rates, member.age);
        moduleRates.push({ code: moduleCode, name: module.name, rate });
      }
    });

    const monthlyCost = baseRate + planRate + moduleRates.reduce((sum, m) => sum + m.rate, 0);

    return {
      member,
      monthlyCost,
      isFree: false,
      breakdown: { baseRate, planRate, moduleRates },
    };
  });

  // Apply 3rd+ child free rule
  // Sort children (age <= 20, not employee) by cost (highest first)
  const children = memberCosts
    .filter((mc) => mc.member.age <= 20 && !mc.member.isEmployee)
    .sort((a, b) => b.monthlyCost - a.monthlyCost);

  // First 2 children pay, 3rd+ are free
  children.forEach((child, index) => {
    if (index >= 2) {
      child.isFree = true;
    }
  });

  const totalMonthlyCost = memberCosts.reduce(
    (sum, mc) => sum + (mc.isFree ? 0 : mc.monthlyCost),
    0
  );
  const totalAnnualCost = totalMonthlyCost * 12;

  const hasFreeMember = memberCosts.some((mc) => mc.isFree);
  const hasChemoModule = members.some((m) => m.selectedModules.includes('chemotherapy'));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Cost Summary</h2>

      {/* Total Cost */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white mb-6">
        <div className="mb-4">
          <p className="text-blue-100 text-sm mb-1">Monthly Premium</p>
          <p className="text-4xl font-bold">${totalMonthlyCost.toFixed(2)}</p>
        </div>
        <div className="pt-4 border-t border-blue-400">
          <p className="text-blue-100 text-sm mb-1">Annual Premium</p>
          <p className="text-2xl font-semibold">${totalAnnualCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Per-Member Breakdown */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Per-Member Breakdown</h3>
        <div className="space-y-3">
          {memberCosts.map((mc) => (
            <div
              key={mc.member.id}
              className={`p-3 rounded-lg border ${
                mc.isFree
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-800">{mc.member.name}</p>
                  <p className="text-xs text-gray-600">
                    Age {mc.member.age} • {mc.member.isEmployee ? 'Employee' : 'Family Member'}
                  </p>
                </div>
                <p className={`font-bold ${mc.isFree ? 'text-green-600' : 'text-gray-800'}`}>
                  {mc.isFree ? 'FREE' : `$${mc.monthlyCost.toFixed(2)}`}
                </p>
              </div>

              {!mc.isFree && (
                <div className="text-xs text-gray-600 space-y-1">
                  {mc.breakdown.baseRate > 0 && (
                    <div className="flex justify-between">
                      <span>Base rate:</span>
                      <span>${mc.breakdown.baseRate.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Plan rate:</span>
                    <span>${mc.breakdown.planRate.toFixed(2)}</span>
                  </div>
                  {mc.breakdown.moduleRates.map((mod) => (
                    <div key={mod.code} className="flex justify-between">
                      <span>{mod.name}:</span>
                      <span>${mod.rate.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info Banners */}
      {hasFreeMember && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800">
              <strong>3rd+ Child Free:</strong> The 3rd and subsequent children are covered at no
              additional cost.
            </p>
          </div>
        </div>
      )}

      {hasChemoModule && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Chemotherapy module has special pricing rules. Contact support
              for details.
            </p>
          </div>
        </div>
      )}

      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            Premiums are calculated based on age and plan selection. Rates effective May 1, 2025.
          </p>
        </div>
      </div>
    </div>
  );
}
