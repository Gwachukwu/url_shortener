// import mongoose, { Schema, Document } from "mongoose";

// export interface ILink {
//   originalLink: string;
//   generatedLink: string;
//   GID: string;
//   createdAt?: Date;
//   updatedAt?: Date;
//   popularity: number;
// }

// export type LinkType = ILink & Document;

// const linkSchema = new Schema({
//   originalLink: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   generatedLink: String,
//   GID: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
//   popularity: {
//     type: Number,
//     default: 0,
//   },
// });

// export const Link = mongoose.model<LinkType>("Link", linkSchema);

import mongoose, { Schema, Document } from "mongoose";

// instantiate a mongoose schema
const URLSchema = new Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {
        type: String,
        default: Date.now
    }
})

// create a model from schema and export it
export const Url = mongoose.model('Url', URLSchema)