import { 
    createRooms,
    deleteRoomById, 
    findAllRooms, 
    findRoomById, 
    updateRoomById} from "../rooms/rooms-Controller";
import { Router } from "express";

const router = Router()

router.post('/', createRooms);
router.get('/', findAllRooms);
router.delete('/:id', deleteRoomById);
router.get('/:id', findRoomById);
router.put('/:id', updateRoomById)

export default router