import { AuthUtils } from "./auth-utils";
import { httpCodeStatus } from "../httpStatus";
import { Request, Response, NextFunction } from "express";

const authUtils = new AuthUtils();

export const authenticateToken = async (
    req: Request, res: Response, next: NextFunction): Promise <any> => {
        const token = req.header('Authorization')?.split(' ')[1];

        if(!token) return res.status(httpCodeStatus.NOT_AUTHENTICATED).send('Ingen token skickades');
        
        const username = await authUtils.verifyToken(token);

        if(!username) return res.status(httpCodeStatus.NOT_AUTHENTICATED).send('Ogiltig token');

        req.body.username = username;

        next();
    } 