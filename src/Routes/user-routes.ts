import {creatingUsers, findAllUsers, deleteUserById, findOneUserById} from "../users/user-controller";
import {Router} from "express";

const router = Router();

router.post('/', creatingUsers);
router.get('/', findAllUsers);
router.delete('/:id', deleteUserById);
router.get('/:id', findOneUserById);

export default router;