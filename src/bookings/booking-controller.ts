import { Request, Response } from "express";
import { bookingRepository, CreateBookings, updateBookings } from "./booking-repository";
import { httpCodeStatus } from "../httpStatus";

const bookingController = new bookingRepository();

// Create booking
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

// get all bookings
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

// find Booking 
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

// delete booking 
export const deleteBookingById = async (req: Request, res: Response) => {
    try {
        const bookingId = await bookingController.delete(req.params.id);

        if(!bookingId) {
            res.status(httpCodeStatus.BAD_REQUEST).json({
                message: 'Booking ID required'
            })
            return
        }
        res.status(httpCodeStatus.OK).json({
            message: 'Booking has been deleted', bookingId
        })
    } catch (error) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            message: 'Booking has not been found'
        })
    }
}

// update booking
export const updateBookingById = async (
    req: Request, res: Response) => {
        
        const updateBooking = req.body as updateBookings

        try {
            const updateId = await bookingController.update(
                req.params.id,
                updateBooking
            )

            if(!updateId) {
                res.status(httpCodeStatus.BAD_REQUEST).json({
                    message: 'Booking ID Required'
                })
                return
            }
            res.status(httpCodeStatus.OK).json({
                message: 'Booking has been updated', updateId
            })

        } catch (error) {
            res.status(httpCodeStatus.NOT_FOUND).json({
                message: 'Booking has not been found', error
            })
        }
    }