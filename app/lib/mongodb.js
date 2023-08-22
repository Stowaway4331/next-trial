import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
let connection;

const connectDB = async () => {
  if (!connection) connection = await mongoose.connect(uri);
  return connection;
};

export default connectDB;
