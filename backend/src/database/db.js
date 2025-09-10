import mongoose from "mongoose";


const database=async ()=>{
try {
 const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(` DB connected: ${db.connection.host}`);
} catch (error) {
 console.log ("unable to connect to db",error)
}
}

export default database;
