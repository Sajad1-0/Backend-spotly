import 'dotenv/config';
import { userSchema } from '../db/schema';
import { db } from '../rooms/rooms-Repository';
import { eq, and } from 'drizzle-orm';

// typen ska innehålla samma egenskaper som databasen. 
export type CreateUser = typeof userSchema.$inferInsert;
// typen update ska låta inmatning i valfria fält. 
export type UpdateUser = Partial<CreateUser>;

export class userRepository {
    
    async create(createUser: CreateUser): Promise<string> {
        const CreatedUser = await db.insert(userSchema)
        .values(createUser)
        .returning({insertedID: userSchema.id})
        return CreatedUser[0].insertedID;
    }

    async findAllUsers(): Promise<CreateUser[]> {
        return await db.select()
        .from(userSchema)
    }

    async findOneUser(id: string): Promise<CreateUser> {
        const findUser = await db.select()
        .from(userSchema)
        .where(and(
            eq(userSchema.id, id)
        ))

        if (findUser.length === 0) {
            throw new Error ('User not been found!')
        }

        return findUser[0]
    }

    async update(id: string, updateUser: UpdateUser): Promise<string> {
        const updateRooms = await db.update(userSchema)
        .set(updateUser)
        .where(eq(userSchema.id, id))
        .returning({updateId: userSchema.id})

        if (updateRooms.length === 0) {
            throw new Error('User has not been found')
        }

        return updateRooms[0].updateId;
    }

    async delete(id: string): Promise<string> {
        if (!id) {
            throw new Error('User ID required')
        }

        const deleteUser = await db.delete(userSchema)
        .where(eq(userSchema.id, id))
        .returning()

        if (deleteUser.length === 0 ) {
            throw new Error(`There is no User with this id ${id}`)
        }
        return deleteUser[0].id;
    }
}