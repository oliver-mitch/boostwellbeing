'use client';

import { FamilyMember } from '@/types/portal';
import { Plus, Trash2, User, Users } from 'lucide-react';

interface FamilyMembersProps {
  members: FamilyMember[];
  activeMemberId: string;
  onMemberSelect: (id: string) => void;
  onAddMember: () => void;
  onDeleteMember: (id: string) => void;
  onUpdateMember: (id: string, updates: Partial<FamilyMember>) => void;
}

export default function FamilyMembers({
  members,
  activeMemberId,
  onMemberSelect,
  onAddMember,
  onDeleteMember,
  onUpdateMember,
}: FamilyMembersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Family Members</h2>
        <button
          onClick={onAddMember}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      <div className="space-y-4">
        {members.map((member) => {
          const isActive = member.id === activeMemberId;

          return (
            <div
              key={member.id}
              onClick={() => onMemberSelect(member.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                isActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {member.isEmployee ? (
                    <User className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                  ) : (
                    <Users className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => onUpdateMember(member.id, { name: e.target.value })}
                      onClick={(e) => e.stopPropagation()}
                      className="text-lg font-semibold bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Member name"
                    />
                    {member.isEmployee && (
                      <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                        EMPLOYEE
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Age:</label>
                      <input
                        type="number"
                        value={member.age}
                        onChange={(e) =>
                          onUpdateMember(member.id, { age: parseInt(e.target.value) || 0 })
                        }
                        onClick={(e) => e.stopPropagation()}
                        min="0"
                        max="120"
                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Type:</label>
                      <select
                        value={member.isEmployee ? 'employee' : 'dependent'}
                        onChange={(e) =>
                          onUpdateMember(member.id, { isEmployee: e.target.value === 'employee' })
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                      >
                        <option value="employee">Employee</option>
                        <option value="dependent">Family Member</option>
                      </select>
                    </div>
                  </div>

                  {member.selectedModules.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">{member.selectedModules.length}</span> module
                      {member.selectedModules.length !== 1 ? 's' : ''} selected
                    </div>
                  )}
                </div>

                {members.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteMember(member.id);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {members.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No family members added yet.</p>
          <p className="text-sm">Click &quot;Add Member&quot; to get started.</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Tip:</strong> Select a family member to customize their module selections.
          The first member is typically the employee.
        </p>
      </div>
    </div>
  );
}
