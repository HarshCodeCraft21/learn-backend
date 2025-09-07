import mongoose from 'mongoose';

export const CONNECTDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connect successfully!!");
    } catch (error) {
        console.log(`failed to connect db :- ${error.message}`);
    }
};