import mongoose, { ConnectOptions } from "mongoose";

const db =
  process.env.NODE_ENV === "test"
    ? `${process.env.DB_TEST}`
    : `${process.env.DB}`;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
