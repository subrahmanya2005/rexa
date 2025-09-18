import mongoose from "mongoose";

const MONGODB = process.env.MONGODB_URL as string;

if (!MONGODB) {
  throw new Error("Please define the MONGODB_URL environment variable inside .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Prevent Mongoose from buffering commands before connection
      // You can add other options here if needed
    };

    cached.promise = mongoose.connect(MONGODB, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected successfully");
    return cached.conn;
  } catch (error: any) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;

