import {CreatingUsers, findAllUsers, deletingUsers} from "../users/user-controller";
import {Router} from "express";

const router = Router();

router.post('/', CreatingUsers);
router.get('/', findAllUsers);
router.delete('/', deletingUsers)

export default router;