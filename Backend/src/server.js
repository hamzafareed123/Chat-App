import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import dbConnect from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookiePraser  from "cookie-parser"





dbConnect();
const app = express();

app.use(express.json());
app.use(cookiePraser());


app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);


const __dirname= path.resolve();


// For Deployment 

if(ENV.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../Frontend/dist")))

  app.get(/^\/.*$/,(req,res)=>{
    res.sendFile(path.join(__dirname,"../Frontend/dist/index.html"))
  })
}


app.listen(ENV.PORT,()=>{
    console.log(`Server Running on Port ${ENV.PORT}`);
})