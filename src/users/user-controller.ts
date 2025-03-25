import { Response, Request } from "express";
import { UserService } from "./user-service";
import { httpCodeStatus } from "../httpStatus";
import { CreateUser, UpdateUser, User, UserCrendentials } from "./user-interface";

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

export const findUserById = async (req: Request, res: Response) => {
    const userIdFromToken = req.params.id;
    const userInfoToGet = req.params['id'];

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

export const deleteUserById = async (req: Request, res: Response) => {
   const userId = req.params.id;
   
   if(!userId) {
    res.status(httpCodeStatus.BAD_REQUEST).json({
        message: 'User ID is required'
    })
    return 
   }

   try {
    await userService.delete(req.params.id)
    res.status(httpCodeStatus.OK).json({
        message: 'User has been deleted', userId
    })
   }
   catch(e) {
    res.status(httpCodeStatus.NOT_FOUND).json({
        error: (e as Error).message
    })
   };
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
            message: 'Invalid username'
        })
        return    
    }

    res.status(httpCodeStatus.OK).json({
        message: 'User has been logged in', jwt
    })
}