import {creatingUsers, findAllUsers, deletingUsers, findOneUserById} from "../users/user-controller";
import {Router} from "express";

const router = Router();

router.post('/', creatingUsers);
router.get('/', findAllUsers);
router.delete('/', deletingUsers);
router.get('/:id', findOneUserById);

export default router;