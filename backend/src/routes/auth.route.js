import express from "express";
import { Register,login} from "../controllers/auth.controller.js";

const route=express.Router();

route.post("/user/register",Register)
route.post('/user/login',login)

export default route;

