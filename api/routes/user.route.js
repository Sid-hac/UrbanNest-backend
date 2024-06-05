import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { verifytoken } from "../middleware/verifytoken.js";



const router = express.Router();

router.get('/', getUsers)
router.get('/:id', verifytoken , getUser)
router.put('/:id', verifytoken, updateUser )
router.delete('/:id', verifytoken, deleteUser )


export default router;