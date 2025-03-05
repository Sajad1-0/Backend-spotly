import 'dotenv/config';
import { bookingSchema } from '../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '../rooms/rooms-Repository';

export  type bookingsTable = typeof bookingSchema.$inferInsert;
export type updateBookings = Partial<bookingsTable>;

export class bookingRepository {

    async Create(createBooking: bookingsTable): Promise<string> {
        const createBookings = await db.insert(bookingSchema)
        .values(createBooking)
        .returning({insertID: bookingSchema.id})
        return createBookings[0].insertID
    }

    async update(id: string, updateBookings: updateBookings): Promise<string> {
        const updateBooking = await db.update(bookingSchema)
        .set(updateBookings)
        .where(eq(bookingSchema.id, id))
        .returning({updateID: bookingSchema.id})

        return updateBooking[0].updateID
    }
}