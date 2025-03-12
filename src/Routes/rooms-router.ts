import { 
    createRooms,
    deletingRooms, 
    findAllRooms, 
    findOneRoom } from "../rooms/rooms-Controller";
import { Router } from "express";

const router = Router()

router.post('/', createRooms);
router.delete('/', deletingRooms);
router.get('/', findAllRooms);
router.get('/:id', findOneRoom)

export default router