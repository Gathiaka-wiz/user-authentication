import colors from 'colors';
import {connect} from 'mongoose';

export const connectDB  = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected ${conn.connection.host} `['blue']);
    } catch (error) {
        console.log(`Error connecting to MongoDB Server: ${error.message}`['yellow']);
        process.exit(1); // if 1 failure , 0 status code is success
    }
} 