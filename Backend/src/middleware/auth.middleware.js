import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { ENV } from "../lib/env.js"

export const protectedRoute = async(req,res,next)=>{
 try {
       const token = req.cookies.jwt;

    if(!token){
        return res.status(401).json({message:"Unauthorize No token found"});
    }

    const decode = jwt.verify(token,ENV.JWT_SECRET);
    console.log("decode",decode)

    if(!decode){
        return res.status(401).json({message:"Unauthorize Invalid token"});
    }

    const user = await User.findById(decode.userId).select("-password")
    if(!user){
        return res.status(404).json({message:"No User Found"});
    }

    req.user=user;

    next();
 } catch (error) {
    res.status(500).json({message:"Error in server"})
 }
}