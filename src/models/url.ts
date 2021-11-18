import mongoose, { Schema } from "mongoose";

const URLSchema = new Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: {
    type: String,
    default: Date.now,
  },
});

export const Url = mongoose.model("Url", URLSchema);
