import { CreateBookings, UpdateBooking } from "../interfaces/booking-interface";
import { bookingRepository } from "./booking-repository";

const bookingService = new bookingRepository();

export class BookingService {
    async create(createBooking: CreateBookings): Promise<string> {

        if(createBooking.startTime >= createBooking.endTime) {
            throw new Error ('Start-Time date must be before end-Time date')
        }

        const checkRoomAvailability = await bookingService.findBookingByRoomIdAndDate(
            createBooking.roomID,
            createBooking.startTime,
            createBooking.endTime
        )

        if (checkRoomAvailability.length > 0 ) {
            throw new Error (`The room is already booked for the selected dates: 
                ${createBooking.startTime}, ${createBooking.endTime}.
                Please choose another date`)
        }


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