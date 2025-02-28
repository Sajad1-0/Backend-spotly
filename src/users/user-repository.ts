import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { userSchema } from '../db/schema';

const db = drizzle(process.env.DATABASE_URL!);

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
}