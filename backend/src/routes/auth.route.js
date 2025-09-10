import express from "express";
import { Register,login,logout,fpRegister,fplogin,fplogout} from "../controllers/auth.controller.js";

const route=express.Router();

route.post("/user/register",Register)
route.post('/user/login',login)
route.post('/user/logout',logout)

//foodpartner routes
route.post("/user/foodpartnerregister",fpRegister)
route.post('/user/foodpartnerlogin',fplogin)
route.post('/user/foodpartnerlogout',fplogout)

export default route;

