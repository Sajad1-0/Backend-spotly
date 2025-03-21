import {creatingUsers, 
    findAllUsers, 
    deleteUserById, 
    updateUserById, 
    findUserById,
    loginUser} from "../users/user-controller";
import {Router} from "express";

const router = Router();

router.post('/', creatingUsers);
router.get('/', findAllUsers);
router.delete('/:id', deleteUserById);
router.get('/:id', findUserById);
router.put('/:id', updateUserById);
router.post('/login', loginUser);

export default router;