import { Router } from "express";
import {
    createBooking, 
    findAllBookings, 
    deleteBookingById, 
    findBookingById, 
    updateBookingById} from "../bookings/booking-controller";
import { authorize } from "../middlewares/authorize-utils";
import { authorizeForOwners } from "../middlewares/authorize-for-owners";

const router = Router()

router.post('/', authorize(['room:create']), createBooking);
router.get('/', authorize(['user:create']), findAllBookings);
router.get('/:id', authorizeForOwners, findBookingById);
router.delete('/:id', authorizeForOwners, deleteBookingById);
router.put('/:id',  authorizeForOwners, updateBookingById)

export default router;