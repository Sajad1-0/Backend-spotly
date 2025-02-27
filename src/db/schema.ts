import {
    integer, 
    pgTable, 
    varchar,
    uuid,
    pgEnum,
} from "drizzle-orm/pg-core";

// skapat en enum 
export const roleEnum = pgEnum('role', ['User', 'Admin']);

export const userSchema = pgTable('users', {
    id: uuid().defaultRandom().primaryKey(),
    username: varchar({length:200}).unique().notNull(),
    password: varchar({length:200}).notNull(),
    role: roleEnum().default('User')
});


