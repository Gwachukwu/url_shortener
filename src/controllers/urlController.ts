import { Request, Response } from "express";
import validUrl from "valid-url";
import { nanoid } from "nanoid";
import * as dotenv from "dotenv";
dotenv.config();

// import the Url database model
import { Url } from "../models/url";

// @route    POST /api/url/shorten:
// @description     Create short URL

// The API base Url endpoint
const baseUrl: string = `${process.env.BASE_URL}`;

export const shortenUrl = async (req: Request, res: Response) => {
  const { longUrl } = req.body;

  // check base url if valid using the validUrl.isUri method
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  // if valid, create the url code
  const urlCode: string = nanoid(8);

  // check long url if valid
  if (validUrl.isUri(longUrl)) {
    try {
      // check if the long URL was in the DB ,else we create it.
      let url = await Url.findOne({
        longUrl,
      });

      // url exist and return the respose
      if (url) {
        res.json(url);
      } else {
        // join the generated short code the the base url
        const shortUrl = baseUrl + "/" + urlCode;

        // invoking the Url model and saving to the DB
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (err) {
      // exception handler
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid longUrl");
  }
};

export const redirectUrl = async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    // find a document match to the code in req.params.code
    const url = await Url.findOne({ urlCode: code });
    if (url) {
      // when valid perform a redirect
      return res.redirect(url.longUrl);
    } else {
      // else return a not found 404 status
      return res.status(404).json("Url Not Found");
    }
  } catch (err) {
    // exception handler
    console.error(err);
    res.status(500).json("Server Error");
  }
};

export const deleteShortUrl = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    // find a document match to the code in req.params.code
    const url = await Url.findOne({ urlCode: code });
    if (!url) {
      // return a not found 404 status
      return res.status(404).json("Url Not Found");
    } else {
      //delete with url code
      await Url.deleteOne({ urlCode: code });
      res.json("Short url deleted successfully");
    }
  } catch (err) {
    // exception handler
    console.error(err);
    res.status(500).json("Server Error");
  }
};

export const getAllUrls = async (req: Request, res: Response) => {
  try {
    //get all saved urls
    const urls = await Url.find({});
    res.json(urls);
  } catch (err) {
    // exception handler
    console.error(err);
    res.status(500).json("Server Error");
  }
};
