import {CreatingUsers} from "./user-controller";
import {Router} from "express";

const router = Router();

router.post('/', CreatingUsers);

export default router;