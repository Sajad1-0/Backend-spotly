export enum Role {
    Admin = 'Admin',
    User = 'User'
}

export type Resource = 'room' | 'user'
export type Action = 'create' | 'read' | 'update' | 'delete'
export type Permission = `${Resource}:${Action}`

export type RolesWithPermissions = {
    [role in Role]: Permission[]
}

export const ROLES_WITH_PERMISSIONS: RolesWithPermissions = {
    [Role.Admin]: ['user:create', 'user:read', 'user:update', 'user:delete',
        'room:create', 'room:read', 'room:update', 'room:delete'
    ],
    [Role.User]: ['user:read', 'room:read']
}


export type Roles = {
    [role in Role]: Role[]
}

export const ROLE_HIERARCHY: Roles = {
    [Role.Admin]: [Role.Admin, Role.User],
    [Role.User]: [Role.User]
}

