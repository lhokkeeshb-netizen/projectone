export const addUser = {
    userRole: 'User Role',
    status: 'Status',
    Password: 'Password',
    employeeName: 'Employee Name',
    userName: 'UserName',
    confirmPassword: 'Confirm Password'
} as const;

export const userRole = {
    admin: 'Admin',
    ess: 'ESS'
} as const;

export const status = {
    enabled: "Enabled",
    disabled: "Disabled",
} as const

export type AdminUser = {
    userRole: string;
    employeeName: string;
    status: string;
    username: string;
    password: string;
};

export function createAdminUser(): AdminUser {

    const random = Date.now();

    return {
        userRole: userRole.admin,
        employeeName: 'Paul Collings',
        status: status.enabled,
        username: `admin${random}`,
        password: `Admin@${random}`
    };
}