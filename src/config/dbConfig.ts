import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!) // ! represents ki, url aaya hi aaya hai.
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected");
        });

        connection.on("error", (error) => {
            console.log("MongoDB connection error, please make sure DB is up and running", error);
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong in connecting to DB", error);
    }
}