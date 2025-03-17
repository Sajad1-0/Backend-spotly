import { Response, Request } from "express";
import { userRepository, CreateUser, UpdateUser } from "./user-repository";
import { httpCodeStatus } from "../httpStatus";

const userController = new userRepository();

// create user
export const creatingUsers = async (req: Request, res: Response) => {
    const createUser = req.body as CreateUser;
    try {
        const userId = await userController.create(createUser);
        res.status(httpCodeStatus.CREATED)
        .json({ message: 'User Created', userId})
    }
    catch (error) {
        res.status(httpCodeStatus.NOT_FOUND)
        .json({error: (error as Error).message})
    }
}

// get all users
export const findAllUsers = async (req: Request, res: Response) => {
    try {
        const userID = await userController.findAllUsers()
        res.status(httpCodeStatus.OK).json(userID)
    }
    catch(error) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (error as Error).message
        })
    }
}

// find user by id

export const findOneUserById = async (req: Request, res: Response) => {
    try {
        const userId = await userController.findOneUser(req.params.id);

        if (!userId) {
            res.status(httpCodeStatus.BAD_REQUEST).json({
                message: 'User ID is required'
            })
        }
        res.status(httpCodeStatus.OK).json({
            message: 'User has been found', userId
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
   const deleteUser = req.body as CreateUser;
   
   if(!deleteUser.id) {
    res.status(httpCodeStatus.BAD_REQUEST).json({
        message: 'User ID is required'
    })
    return
   }

   try {
    const userId = await userController.delete(deleteUser.id)
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
        
        const userUpdateId = await userController.update(req.params.id, updateUser);
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