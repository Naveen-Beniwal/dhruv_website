import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect("mongodb+srv://123102090:URtrwClcBD6pbIc9@cluster0.2chevlt.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0");
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
}

