import { Response, Request } from "express";
import { userRepository, CreateUser } from "./user-repository";
import { httpCodeStatus } from "../httpStatus";

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