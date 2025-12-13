import express from "express"

const router = express.Router();

router.get("/signup",async (req,res)=>{
    res.send("Signup is running ")
});

router.get("/login",async (req,res)=>{
    res.send("login is running ")
});

router.get("/logout",async (req,res)=>{
    res.send("logout is running ")
});

export default router;