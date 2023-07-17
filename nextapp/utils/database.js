import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
    mongoose.set('strictQuery', true); // to disable all warnings from console
    if (isConnected) {
        console.log("mongo Db is connected")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("mongo Db is connected")

    }
    catch (error) {
        console.log(error, "error in connecting to mongo db")
    }

}