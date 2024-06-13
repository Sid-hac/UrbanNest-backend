
import express from "express"
import { verifytoken } from "../middleware/verifytoken.js";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller.js";


const router = express.Router();

router.get('/', getPosts )
router.get('/:id', getPost)
router.post('/', verifytoken ,  addPost)
router.put('/:id', verifytoken, updatePost)
router.delete('/:id', verifytoken, deletePost)


export default router;