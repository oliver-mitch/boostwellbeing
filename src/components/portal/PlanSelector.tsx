'use client';

import { EMPLOYEE_PLANS, EMPLOYEE_MODULES, Plan, Module } from '@/data/rateData';
import { FamilyMember } from '@/types/portal';
import { Check, Info } from 'lucide-react';

interface PlanSelectorProps {
  selectedPlan: string;
  onPlanSelect: (planCode: string) => void;
  activeMember: FamilyMember | null;
  onModuleToggle: (moduleCode: string) => void;
}

export default function PlanSelector({
  selectedPlan,
  onPlanSelect,
  activeMember,
  onModuleToggle,
}: PlanSelectorProps) {
  const isWellbeingPlan = selectedPlan?.startsWith('wb_');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Your Plan</h2>

      {/* Plan Selection */}
      <div className="space-y-3 mb-8">
        {EMPLOYEE_PLANS.map((plan) => (
          <button
            key={plan.code}
            onClick={() => onPlanSelect(plan.code)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedPlan === plan.code
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg text-gray-800">{plan.name}</h3>
                  {selectedPlan === plan.code && (
                    <Check className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Module Selection - Only shown for Wellbeing plans */}
      {isWellbeingPlan && activeMember && (
        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Optional Modules for {activeMember.name}
            </h3>
            <Info className="w-5 h-5 text-gray-400" />
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Wellbeing plans allow you to add optional modules for additional coverage.
          </p>

          <div className="space-y-3">
            {EMPLOYEE_MODULES.map((module) => {
              const isSelected = activeMember.selectedModules.includes(module.code);

              return (
                <button
                  key={module.code}
                  onClick={() => onModuleToggle(module.code)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800">{module.name}</h4>
                        {isSelected && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {activeMember.selectedModules.length === 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> No modules selected. The base plan will provide hospital cover only.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Info Banner */}
      {selectedPlan && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Plan Information</p>
              <p>
                This is an employee subsidized plan. Your employer contributes to the base rate,
                and you pay the age-rated premium shown in the cost summary.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
