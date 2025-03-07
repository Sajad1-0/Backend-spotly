import { Router } from "express";
import { createBooking, findAllBookings, deleteBooking } from "../bookings/booking-controller";

const router = Router()

router.post('/', createBooking);
router.get('/', findAllBookings);
router.delete('/', deleteBooking);

export default router;