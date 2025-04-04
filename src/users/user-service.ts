import { UserCrendentials, CreateUser, UpdateUser } from "../interfaces/user-interface";
import { AuthUtils } from "../middlewares/auth-utils";
import { userRepository } from "./user-repository";
import { Role } from "./user-roles";

const authUtils = new AuthUtils();
const userRepo = new userRepository();

export class UserService {

    // create user
    async create(createUser: CreateUser): Promise<string> {
        const hashedPassword = await authUtils.hashPassword(createUser.password);

        return userRepo.create({
            username: createUser.username,
            password: hashedPassword,
            role: createUser.role
        })
    }

    async findAllUsers() {
        return userRepo.findAllUsers()
    }

    async findUserById(id: string) {
        return userRepo.findUserById(id)
    }

    async update(id: string, updateUser: UpdateUser) {
        // bycrypt password if it has been updated
        const hashedPassword = await authUtils.hashPassword(
            updateUser.password);
        updateUser.password = hashedPassword;    
        return userRepo.update(id, updateUser)
    }

    async delete(id: string) {
        return userRepo.delete(id)
    }

    async login(crendentials: UserCrendentials): Promise<string | null> {
        const hashedPassword = await userRepo.getPassword(crendentials.username)

        if(!hashedPassword) {
            console.warn(`The password doesn't match for this user: ${crendentials.username}`)
            return null
        }

        const user = await userRepo.findUserByUsername(crendentials.username)

        if(!user) {
            console.warn(`User with id: ${crendentials.username} doesn't exist`)
            return null
        }

        const correctCrendentials = await authUtils.validatePassword(
            crendentials.password, hashedPassword
        )

        if(!correctCrendentials) {
            console.warn(`Wrong password for user with username: ${crendentials.username}`)
            return null
        }
        
        //hämta från databasen och inte från UserCrendentials
        return authUtils.generateToken(user.id, user.role as Role, user.username);
    }
}