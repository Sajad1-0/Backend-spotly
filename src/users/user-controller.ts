import { Response, Request } from "express";
import { UserService } from "./user-service";
import { httpCodeStatus } from "../httpStatus";
import { CreateUser, UpdateUser, User, UserCrendentials, AuthenticateRequest } from "../interfaces/user-interface";

const userService = new UserService();

// create user
export const creatingUsers = async (req: Request, res: Response) => {
    const createUser = req.body as CreateUser;
    try {
        const userId = await userService.create(createUser);
        res.status(httpCodeStatus.CREATED).json({
            message: 'User has been created', userId
        })
    } catch (error) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (error as Error).message
        })
    }
}

// get all users
export const findAllUsers = async (req: Request, res: Response) => {
    try {
        const userID = await userService.findAllUsers()
        res.status(httpCodeStatus.OK).json(userID)
    }
    catch(error) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (error as Error).message
        })
    }
}

export const findUserById = async (req: AuthenticateRequest, res: Response) => {

    const userIdFromToken = req.jwtPayload?.userId;
    const userInfoToGet = req.params.id;

    if (userIdFromToken !== userInfoToGet) {
        res.status(httpCodeStatus.NOT_AUTHORIZED).send(`
            ${userIdFromToken} isn't allowed to get information
            about ${userInfoToGet}`)
        return
    }

    try {
        const userInfo = await userService.findUserById(req.params.id);

        if (!userInfo) {
            res.status(httpCodeStatus.NOT_FOUND).send(
                `Kunde inte hitta användaren med id: ${userInfoToGet}`
            )
        }
        res.status(httpCodeStatus.OK).json({
            message: 'User has been found', userInfo
        })
    }
    catch (error) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (error as Error).message 
        })
    }
}

// delete user
export const deleteUserById = async (req: AuthenticateRequest, res: Response) => {
    const userIdFromToken = req.jwtPayload?.userId; 
    const userId = req.params.id;
    const userRoleFromToken = req.jwtPayload?.role;
    
    const isAuthorized = userRoleFromToken === 'Admin' || userIdFromToken === userId 

    if(!isAuthorized) {
        res.status(httpCodeStatus.NOT_AUTHORIZED).send(
            `${userIdFromToken} isn't allowed to delete this user: 
            ${userId}`
        )
        return 
    }
    
    try {
        await userService.delete(userId)
        res.status(httpCodeStatus.NO_CONTENT).send(`
            ${userId} has been deleted`)
    } catch (error) {
        res.status(httpCodeStatus.INTERNAL_SERVER_ERROR).send(`
            Something went wrong`)
    }

};

// update user

export const updateUserById = async (req: Request, res: Response) => {
   
    const updateUser = req.body as UpdateUser
    try {
        
        const userUpdateId = await userService.update(req.params.id, updateUser);
        if(!userUpdateId) {
            res.status(httpCodeStatus.BAD_REQUEST).json({
                message: 'User ID is required'
            })
            return
           } 

        res.status(httpCodeStatus.OK).json({
            message: 'User has been updated', userUpdateId
        })

    } catch (error) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (error as Error).message
        })
    }
    
}

export const loginUser = async (req: Request, res: Response) => {
    const userLogin = req.body as UserCrendentials;
    const jwt = await userService.login(userLogin);
    
    if (!jwt) {
        console.log(`Couldn't login user with username:
        ${userLogin.username}`);
        res.status(httpCodeStatus.NOT_AUTHENTICATED).json({
            message: 'Invalid username or password! please try again'
        })
        return    
    }

    res.status(httpCodeStatus.OK).json({
        message: 'User has been logged in', jwt
    })
}