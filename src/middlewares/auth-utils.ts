import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from '../users/user-interface';

dotenv.config();

const secret = process.env.JWT_SECRET!;

export class AuthUtils {
    async hashPassword(password: string) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword)
    }

    async generateToken(username: string): Promise<string> {
        const payload = {'username': username};
        return jwt.sign(payload, secret, {expiresIn: '15m'});
    }


    async verifyToken(token: string): Promise<string | null> {
        try {
            const payload = jwt.verify(token, secret) as JwtPayload;
            return payload.username;
        } catch (error) {
            console.error(`Jwt verification error: ${error}`);
            return null
        }
    }
}