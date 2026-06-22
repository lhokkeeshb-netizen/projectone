export const dashBoardCard = {
    timeAtWork: 'Time At Work',
    myActions: 'My Actions',
    quickLaunch: 'Quick Launch',
    buzzLatestPosts: 'Buzz Latest Posts',
    employeesOnLeaveToday: 'Employees on Leave Today',
    employeeDistributionBySubUnit: 'Employee Distribution by Sub Unit'
    
} as const

export type dashBoardCard =
    typeof dashBoardCard[keyof typeof dashBoardCard];