import mongoose,{ConnectOptions} from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }  as ConnectOptions);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
