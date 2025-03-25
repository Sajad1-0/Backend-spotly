export interface User {
    id: string;
    username: string;
    password: string;
    role: string
}

export interface UpdateUser {
    username?: string;
    password: string;
    role?: "User" | "Admin";
}

export interface UserWithoutPassword extends Omit<User, "password"> {}
export interface CreateUser extends Omit<User, "id"> {}
export interface UserCrendentials extends Pick<User, "username" | "password"> {}

export interface JwtPayload {
    username: string;
}