import express from "express"
import { checkUser, signup } from "../controllers/auth.js";
import { signin } from "../controllers/auth.js";
import { logout } from "../controllers/auth.js";
import { updateProfile } from "../controllers/auth.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {arcjetProtect} from "../middleware/arcjet.middleware.js"

const router = express.Router();


router.use(arcjetProtect);
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/logout",logout)

router.put("/update-profile",protectedRoute,updateProfile);

router.get("/check",protectedRoute,checkUser);

export default router;