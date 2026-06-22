export const Urls = {
    beforeLogin: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    dashboard: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'  
}

export const loginCreds = {
    userName: process.env.USERID!,
    password: process.env.PASSWORD!
}

export const sideNavigation = {
    admin: 'Admin',
    pim:'PIM',
    leave:'Leave',
    time:'Time',
    recruitment:'Recruitment',
    myInfo: 'My Info',
    performance: 'Performance',
    dashboard: 'Dashboard',
    directory: 'Directory',
    maintenance: 'Maintenance',
    claim: 'Claim',
    buzz: 'Buzz'
} as const

export type SideNavigation =
    typeof sideNavigation[keyof typeof sideNavigation];

export const headerTitle = {
    admin: 'Admin',
    pim: 'PIM',
    leave: 'Leave',
    time: 'Time',
    recruitment: 'Recruitment',
    myInfo: 'My Info',
    performance: 'Performance',
    dashBoard: 'Dashboard',
    directory: 'Directory',
    maintenance: 'Maintenance',
    claim: 'Claim',
    buzz: 'Buzz'
} as const

export type HeaderTitle =
    typeof headerTitle [keyof typeof headerTitle];
