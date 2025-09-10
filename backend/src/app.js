import express from "express"
import route from "./routes/auth.route.js";
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express();


app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser())

app.use("/api/auth",route)


export default app;