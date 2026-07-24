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

export type SystemUser = {
    userRole: string;
    employeeName: string;
    status: string;
    username: string;
    password: string;
};

export function createAdminOrEssUser(role: string): SystemUser {
    const random = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    return {
        userRole: role,
        employeeName: 'P',
        status: status.enabled,
        username: `admin${random}`,
        password: `Admin@${random}`
    };
}
