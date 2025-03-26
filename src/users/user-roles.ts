export enum Role {
    Admin = 'Admin',
    User = 'User'
}

export type Permission = 'create' | 'read' | 'update' | 'delete';

export type RolesWithPermissions = {
    [role in Role]: Permission[]
}

export const ROLES_WITH_PERMISSIONS: RolesWithPermissions = {
    [Role.Admin]: ['create', 'read', 'update', 'delete'],
    [Role.User]: ['read']
}


export type Roles = {
    [role in Role]: Role[]
}

export const ROLE_HIERARCHY: Roles = {
    [Role.Admin]: [Role.Admin, Role.User],
    [Role.User]: [Role.User]
}

