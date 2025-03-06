import { Request, Response } from "express";
import { bookingRepository, CreateBookings } from "./booking-repository";
import { httpCodeStatus } from "../httpStatus";

const bookingController = new bookingRepository();


export const CreateBooking = async (req: Request, res: Response) => {
    const createBooking = req.body as CreateBookings;

    try {
        const bookingId = await bookingController.Create(createBooking)
        res.status(httpCodeStatus.CREATED).json({
            message: 'You succesfully create a booking', bookingId
        })
    }
    catch(err) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (err as Error).message;
        })
    }
}

export const FindAllBookings = async (req: Request, res: Response) => {
    try {
        const bookingID = await bookingController.findAllBookings()
        res.status(httpCodeStatus.OK).json(bookingID)
    }
    catch(err) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (err as Error).message
        })
    }
}

export const DeleteBooking = async (req: Request, res: Response) => {
    const deletedBooking = req.body as CreateBookings;

    if(!deletedBooking.id) {
        res.status(httpCodeStatus.BAD_REQUEST).json({
            message: 'Booking ID required'
        })
        return
    }

    try {
        const bookingID = await bookingController.delete(deletedBooking.id)
        res.status(httpCodeStatus.OK).json({
            message: 'Booking has been deleted', bookingID
        })
    }
    catch(err) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (err as Error).message
        })
    }
}