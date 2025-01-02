import mongoose from "mongoose";

export const connectToDatabase = async () : Promise<void> => {
    const MONGO_URI = process.env.MONGO_URI as string || "mongodb://localhost:27017/devjobs";

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
