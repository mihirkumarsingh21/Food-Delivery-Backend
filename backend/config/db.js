import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
       .then(() => console.log(`DATABASE CONNECTED SUCCESSFULLY...`))
    } catch (error) {
        console.log(`FAILED TO CONNECT DATABASE : ${error}`);
        
    }
}
