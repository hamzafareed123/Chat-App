import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path"


dotenv.config();
const app = express();


app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

const __dirname= path.resolve();


// For Deployment 

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../Frontend/dist")))

  app.get(/^\/.*$/,(req,res)=>{
    res.sendFile(path.join(__dirname,"../Frontend/dist/index.html"))
  })
}


app.listen(process.env.PORT,()=>{
    console.log(`Server Running on Port ${process.env.PORT}`);
})