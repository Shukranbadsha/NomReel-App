import app from "./app.js";
import dotenv from "dotenv";
import database from "./database/db.js";

dotenv.config();

database()

.then(()=>{
app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})
})
.catch((error)=>{
    console.log(`Enable to connect with DB`,error)
})