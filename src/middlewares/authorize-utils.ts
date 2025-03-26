import { Role, Permission, ROLES_WITH_PERMISSIONS } from "../users/user-roles";
import { Response, NextFunction } from "express";
import { httpCodeStatus } from "../httpStatus";
import { AuthenticatedRequest } from "../interfaces/user-interface";


export const authorize = (requiredPermissions: Permission[]) => {
    return (req: AuthenticatedRequest, res: Response, 
        next: NextFunction): void => {
            const { role } = req.JwtPayload || {};
            
            if(!role) {
                res.status(httpCodeStatus.NOT_AUTHENTICATED)
                .send('User is not authenticated');
                return
            }

            if(role === Role.Admin) {
                console.log('User is and Admin, skip authentication')
            }

            const userPermissions = ROLES_WITH_PERMISSIONS[role]

            if(!userPermissions) {
                res.status(httpCodeStatus.NOT_AUTHORIZED)
                .send('User missing permission')
                return
            }

            const hasRequiredPermission = requiredPermissions
            .every((permission) => userPermissions.includes(permission))

            if(!hasRequiredPermission) {
                res.status(httpCodeStatus.NOT_AUTHORIZED)
                .send('Permission denied')
                return
            }
            
        next()
    }
}