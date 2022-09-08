import express from "express";
import { postLink, getLink } from "../Links/urlCrud.js";
const router = express.Router();

router.get("/:shortLink", getLink);
router.post("/link", postLink);
// router.post("/delete/:short-url", deleteLink);
// router.get("/:url")

export default router