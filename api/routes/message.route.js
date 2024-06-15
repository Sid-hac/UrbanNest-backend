import express from "express"

import { verifytoken } from "../middleware/verifytoken.js";
import { addMessage } from "../controllers/message.controller.js";



const router = express.Router();


router.post('/:chatId', verifytoken , addMessage)



export default router;