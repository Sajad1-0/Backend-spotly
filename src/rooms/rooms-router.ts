import { CreateRooms, deletingRooms, findAllRooms } from "./rooms-Controller";
import { Router } from "express";

const router = Router()

router.post('/', CreateRooms);
router.put('/', deletingRooms);
router.get('/', findAllRooms);

export default router