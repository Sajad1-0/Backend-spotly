import 'dotenv/config';
import { bookingSchema } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { db } from '../rooms/rooms-Repository';

export  type CreateBookings = typeof bookingSchema.$inferInsert;
export type updateBookings = Partial<CreateBookings>;

export class bookingRepository {

    async create(createBooking: CreateBookings): Promise<string> {
        const createBookings = await db.insert(bookingSchema)
        .values(createBooking)
        .returning({insertId: bookingSchema.id})
        return createBookings[0].insertId
    }

    async update(id: string, updateBookings: updateBookings): Promise<string> {
        const updateBooking = await db.update(bookingSchema)
        .set(updateBookings)
        .where(eq(bookingSchema.id, id))
        .returning({updateId: bookingSchema.id})

        return updateBooking[0].updateId
    }

    async findAllBookings(): Promise<CreateBookings[]> {
        return await db.select().from(bookingSchema);
    }

    async findOneBooking(id: string): Promise<CreateBookings> {
        const bookingId = await db.select()
        .from(bookingSchema)
        .where(and(
            eq(bookingSchema.id, id)
        ))
        
        if(bookingId.length === 0) {
            throw new Error('The booking has been not found')
        }
        
        return bookingId[0]
    }

    async delete(id: string): Promise<string> {
        if(!id) {
            throw new Error('Booking ID required!')
        }
        const deleteBooking = await db.delete(bookingSchema)
        .where(eq(bookingSchema.id, id))
        .returning()

        if (deleteBooking.length === 0) {
            throw new Error('The booking has been not found')
        }
        return deleteBooking[0].id
    }
}