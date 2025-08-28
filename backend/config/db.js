// db.js - Handles MongoDB connection logic
import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the URI from environment variables.
 * Logs connection status and errors.
 */
export const connectDB = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
