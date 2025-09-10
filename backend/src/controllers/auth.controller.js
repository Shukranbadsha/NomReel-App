 import User from "../models/user.model.js";
 import foodPartner from "../models/food-partner.model.js";
 import bcrypt from "bcrypt";
 import jwt from "jsonwebtoken"

 const Register= async (req, res) => {
  try {
const {name,email,password}=req.body;
const exist= await User.findOne({email})

if(exist){
return res.status(400).json({  
  message:"User already exist ", success: false
})
}

const newUser=new User({name,email,password}) 
newUser.password= await bcrypt.hash(password,10) 
await newUser.save()

//jwt
const jwttokin= jwt.sign({email:newUser.email , _id:newUser._id} , process.env.JWT_SECERT,
        {expiresIn:"20h"})
res.cookie("token",jwttokin)

res.status(200).json({
  message:"Login succesfully", 
  success:true,
  user:{
  email:newUser.email, //the new user is store in exist so thats why we used exist.
  name:newUser.name,
  _id:newUser._id
  }
})

 
  } catch (error) {
  res.status(400).json({
    message:"Server failed",error
  })
  }
};


//login
 const login= async (req, res) => {
  try {
const {email,password}=req.body;
const exist= await User.findOne({email})
if(!exist){    
return res.status(400).json({
  message:"Authentication fail ", success: false
})
}
const passverify= await bcrypt.compare(password,exist.password)
if(!passverify){
  return res.status(400).json({
  message:"Authentication fail ", success: false
})
      }

//jwt
const jwttokin= jwt.sign({email:exist.email , _id:exist._id} , process.env.JWT_SECERT,
        {expiresIn:"20h"}
      )
  res.cookie("token",jwttokin)
res.status(200).json({
  message:"Login succesfully", 
  success:true,
  user:{
  email:exist.email, //the new user is store in exist so thats why we used exist.
  name:exist.name,
  _id:exist._id
  }
})

  } catch (error) {
  res.status(400).json({
    message:"Server failed",error
  })
  }
};

//logout
const logout= async(req,res)=>{
  res.clearCookie("token");
  res.status(200).json({message:"Logout successful"});

}

//foodpartner register
const fpRegister= async(req,res)=>{
  try{
  const {name,email,password}=req.body
  const exist= await foodPartner.findOne({email})
  if(exist){
    return res.status(400).json({message:"User already register", success:false})
  }
  const newuser= new foodPartner({name,email,password})
  newuser.password= await bcrypt.hash(password,10) 
await newuser.save()

//jwt
const jwttokin= jwt.sign({email:newuser.email , _id:newuser._id} , process.env.JWT_SECERT,
        {expiresIn:"20h"})
res.cookie("token",jwttokin)

res.status(200).json({
  message:"Login succesfully", 
  success:true,
  user:{
  email:newuser.email, //the new user is store in exist so thats why we used exist.
  name:newuser.name,
  _id:newuser._id
  }

})
  }catch(error){
res.status(400).json({
    message:"Server failed",error
  })
  }
}

 const fplogin= async (req, res) => {
  try {
const {email,password}=req.body;
const exist= await foodPartner.findOne({email})
if(!exist){    
return res.status(400).json({
  message:"Authentication fail ", success: false
})
}
const passverify= await bcrypt.compare(password,exist.password)
if(!passverify){
  return res.status(400).json({
  message:"Authentication fail ", success: false
})
      }

//jwt
const jwttokin= jwt.sign({email:exist.email , _id:exist._id} , process.env.JWT_SECERT,
        {expiresIn:"20h"}
      )
  res.cookie("token",jwttokin)
res.status(200).json({
  message:"Login succesfully", 
  success:true,
  user:{
  email:exist.email, //the new user is store in exist so thats why we used exist.
  name:exist.name,
  _id:exist._id
  }
})

  } catch (error) {
  res.status(400).json({
    message:"Server failed",error
  })
  }
};

const fplogout= async(req,res)=>{
  res.clearCookie("token");
  res.status(200).json({message:"Logout successful"});

}
export {
  Register,
  login,
  logout,
  fpRegister,
  fplogin,
  fplogout

};