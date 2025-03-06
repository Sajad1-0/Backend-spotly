import {CreatingUsers, findAllUsers, deletingUsers} from "./user-controller";
import {Router} from "express";

const router = Router();

router.post('/', CreatingUsers);
router.get('/', findAllUsers);
router.delete('/', deletingUsers)

export default router;