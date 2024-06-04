import express from "express"
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test.controller.js";
import { verifytoken } from "../middleware/verifytoken.js";


const router = express.Router();

router.get("/should-be-logged-in",verifytoken, shouldBeLoggedIn)
router.get("/should-be-admin", shouldBeAdmin)


export default router;