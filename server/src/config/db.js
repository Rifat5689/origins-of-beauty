import mongoose from 'mongoose'
const connectDB = async () => {
  try {
    // Connect to MongoDB using the environment variable
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully via Mongoose.');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1); // Stop the application on failure
  }
};

export default  connectDB;
