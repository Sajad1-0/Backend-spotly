import { Router } from "express";
import {
    createBooking, 
    findAllBookings, 
    deleteBookingById, 
    findBookingById } from "../bookings/booking-controller";

const router = Router()

router.post('/', createBooking);
router.get('/', findAllBookings);
router.get('/:id', findBookingById);
router.delete('/:id', deleteBookingById);

export default router;