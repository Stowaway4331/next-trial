import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(process.env.MONGO_URI);
//       console.log("db connected");
//     } else {
//       console.log("failed to establish db connection");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default connectDB;

const uri = process.env.MONGO_URI;
let connection;

const connectDB = async () => {
  if (!connection) connection = await mongoose.connect(uri);
  return connection;
};

export default connectDB;
