import {creatingUsers, findAllUsers, deletingUsers} from "../users/user-controller";
import {Router} from "express";

const router = Router();

router.post('/', creatingUsers);
router.get('/', findAllUsers);
router.delete('/', deletingUsers)

export default router;