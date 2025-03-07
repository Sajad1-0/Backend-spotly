import { createRooms, deletingRooms, findAllRooms } from "../rooms/rooms-Controller";
import { Router } from "express";

const router = Router()

router.post('/', createRooms);
router.delete('/', deletingRooms);
router.get('/', findAllRooms);

export default router