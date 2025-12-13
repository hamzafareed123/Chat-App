import express from "express";

const router = express.Router();

router.get("/send",async(req,res)=>{
    res.send("Send API works");
});

export default router;