import express from "express";
import { postLink, redirectLink, getAllLinks} from "../Links/urlCrud.js";
const router = express.Router();

router.get("/:shortLink", redirectLink);
router.post("/link", postLink);
router.get("/", getAllLinks)
// router.get("/link", getLink)
// router.post("/delete/:short-url", deleteLink);
// router.get("/:url")

export default router