import express from "express"
import { verifytoken } from "../middleware/verifytoken.js";
import { addChat, getChat, getChats, readChat } from "../controllers/chat.controller.js";



const router = express.Router();

router.get('/',  verifytoken ,  getChats)
router.get('/:id', verifytoken , getChat)
router.post('/', verifytoken , addChat)
router.put('/read/:id', verifytoken , readChat)


export default router;