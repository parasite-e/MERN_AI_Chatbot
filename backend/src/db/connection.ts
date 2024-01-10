import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        throw new Error("cannot connect to Database");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        throw new Error("cannot disconnect from Database");
    }
}

export { connectToDatabase, disconnectFromDatabase }