import express from "express"
import { deleteUser, getNotificationNumber, getUser, getUsers, profilePosts, savePost, updateUser } from "../controllers/user.controller.js";
import { verifytoken } from "../middleware/verifytoken.js";



const router = express.Router();

router.get('/', getUsers)
// router.get('/:id', verifytoken , getUser)
router.put('/:id', verifytoken, updateUser )
router.delete('/:id', verifytoken, deleteUser )
router.post('/save', verifytoken, savePost)
router.get('/profileposts',verifytoken,profilePosts)
router.get('/notification', verifytoken, getNotificationNumber)


export default router;