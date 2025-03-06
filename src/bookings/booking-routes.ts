import { Router } from "express";
import { CreateBooking, FindAllBookings, DeleteBooking } from "./booking-controller";

const router = Router()

router.post('/', CreateBooking);
router.get('/', FindAllBookings);
router.delete('/', DeleteBooking);

export default router;