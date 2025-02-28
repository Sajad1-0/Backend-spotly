import { Response, Request } from "express";
import { userRepository, CreateUser } from "./user-repository";
import { httpCodeStatus } from "../httpStatus";

const userController = new userRepository();

export const CreatingUsers = async (req: Request, res: Response) => {
    const createUser = req.body as CreateUser;
    const userID = await userController.create(createUser);
    res.status(httpCodeStatus.CREATED).json({ message: 'User created', userID})
}