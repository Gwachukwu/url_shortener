import {
  shortenUrl,
  redirectUrl,
  deleteShortUrl,
  getAllUrls,
} from "../controllers/urlController";
import express from "express";

const router = express.Router();

router
  .get("/", (req: express.Request, res: express.Response) =>
    res.redirect(301, "/api")
  )
  .get("/api", (req: express.Request, res: express.Response) =>
    res.json("Url shortener api")
  )
  .get("/api/all", getAllUrls)
  .get("/:code", redirectUrl);

router.post("/api/url/shorten", shortenUrl);
router.delete("/:code", deleteShortUrl);

export default router;
