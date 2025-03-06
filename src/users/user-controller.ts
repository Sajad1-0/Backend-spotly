import { Response, Request } from "express";
import { userRepository, CreateUser, UpdateUser } from "./user-repository";
import { httpCodeStatus } from "../httpStatus";
import { json } from "drizzle-orm/gel-core";

const userController = new userRepository();

export const CreatingUsers = async (req: Request, res: Response) => {
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

export const findAllUsers = async (req: Request, res: Response) => {
    try {
        const userID = await userController.findAllUsers()
        res.status(httpCodeStatus.OK).json(userID)
    }
    catch(error) {
        res.status(httpCodeStatus.NOT_FOUND),json('No user has been found')
    }
}

export const deletingUsers = async (req: Request, res: Response) => {
   const deleteUser = req.body as CreateUser;
   
   if(!deleteUser.id) {
    res.status(httpCodeStatus.BAD_REQUEST).json({
        message: 'User ID is required'
    })
    return
   }

   try {
    const userID = await userController.delete(deleteUser.id)
    res.status(httpCodeStatus.OK).json({
        message: 'User has been deleted', deleteUser
    })
   }
   catch(e) {
    res.status(httpCodeStatus.NOT_FOUND).json({
        error: (e as Error).message
    })
   };
};