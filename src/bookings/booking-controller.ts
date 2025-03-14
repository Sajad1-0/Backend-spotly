import { Request, Response } from "express";
import { bookingRepository, CreateBookings } from "./booking-repository";
import { httpCodeStatus } from "../httpStatus";

const bookingController = new bookingRepository();


export const createBooking = async (req: Request, res: Response) => {
    const createBooking = req.body as CreateBookings;

    try {
        const bookingId = await bookingController.create(createBooking)
        res.status(httpCodeStatus.CREATED).json({
            message: 'You succesfully create a booking', bookingId
        })
    }
    catch(err) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (err as Error).message
        })
    }
}

export const findAllBookings = async (req: Request, res: Response) => {
    try {
        const bookingId = await bookingController.findAllBookings()
        res.status(httpCodeStatus.OK).json(bookingId)
    }
    catch(err) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (err as Error).message
        })
    }
}

export const findBookingById = async (req: Request, res: Response) => {
    try {
        const bookingId = await bookingController.findOneBooking(req.params.id);
        
        if(!bookingId) {
            res.status(httpCodeStatus.BAD_REQUEST).json({
                message: 'The booking required ID'
            })
        }
        res.status(httpCodeStatus.OK).json({
            message: 'Booking has been found', bookingId
        })
    }
    catch(err) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (err as Error).message
        })
    }
}

export const deleteBookingById = async (req: Request, res: Response) => {
    const deletedBooking = req.body as CreateBookings;

    if(!deletedBooking.id) {
        res.status(httpCodeStatus.BAD_REQUEST).json({
            message: 'Booking ID required'
        })
        return
    }

    try {
        const bookingId = await bookingController.delete(deletedBooking.id)
        res.status(httpCodeStatus.OK).json({
            message: 'Booking has been deleted', bookingId
        })
    }
    catch(err) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (err as Error).message
        })
    }
}