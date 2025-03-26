import { CreateBookings, UpdateBooking } from "../interfaces/booking-interface";
import { bookingRepository } from "./booking-repository";

const bookingService = new bookingRepository();

export class BookingService {
    async create(createBooking: CreateBookings): Promise<string> {
        return await bookingService.create(createBooking)
    }

    async findAll() {
        return await bookingService.findAllBookings()
    }

    async findOne(id: string) {
        return await bookingService.findOneBooking(id)
    }

    async update(id: string, updateBooking: UpdateBooking) {
        return await bookingService.update(id, updateBooking)
    }

    async delete(id: string) {
        return await bookingService.delete(id)
    }
}