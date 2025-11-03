/**
 * Accurate Southern Cross Health Insurance Statistics
 * Source: https://www.southerncross.co.nz/society/business
 * Last verified: November 2025
 */

export const southernCrossStats = {
  // Verified claims from Southern Cross
  claimsPercentage: '68%',
  claimsPercentageDescription: 'of all NZ health insurance claims',

  claimsPayout: '94c',
  claimsPayoutDescription: 'per dollar received in premiums',

  trustRanking: '9 years',
  trustRankingDescription: "NZ's most trusted health insurer",

  minimumEmployees: 5,
  minimumEmployeesDescription: 'minimum full-time employees required',

  waitingListReduction: '50%',
  waitingListReductionDescription: 'less time on waiting lists for members',

  mentalHealthSessions: 3,
  mentalHealthSessionsDescription: 'free Raise mental health sessions per year',

  // Industry research stats (not from Southern Cross directly)
  // Use these with disclaimers
  industryStats: {
    benefitsRetention: '53%',
    benefitsRetentionSource: 'Industry research - employees who stay for benefits',

    averageROI: '2:1',
    averageROISource: 'Industry average for workplace wellness programs',

    productivityGain: '25-40%',
    productivityGainSource: 'Research on employee health programs',
  },

  // Safe messaging to use
  messaging: {
    brandPromise: "New Zealand's most trusted health insurer",
    businessClaim: "More businesses choose us than any other NZ health insurer",
    structure: "New Zealand owned and not-for-profit",
    customerService: "Award-winning customer service (2025 Reader's Digest Quality Service Award)",
  }
};

// Export specific verified stats for easy use
export const verifiedStats = {
  '68%': 'of all NZ health insurance claims',
  '94c': 'paid per dollar in premiums',
  '9 years': "NZ's most trusted",
  '50%': 'less waiting time',
  '5+': 'employees required',
  '3': 'free mental health sessions',
};
