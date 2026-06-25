export const dashBoardCard = {
    timeAtWork: 'Time at Work',
    myActions: 'My Actions',
    quickLaunch: 'Quick Launch',
    buzzLatestPosts: 'Buzz Latest Posts',
    employeesOnLeaveToday: 'Employees on Leave Today',
    employeeDistributionBySubUnit: 'Employee Distribution by Sub Unit',
    employeeDistributionByLocation: 'Employee Distribution by Location'
    
} as const

export type dashBoardCard =
    typeof dashBoardCard[keyof typeof dashBoardCard];