import express from "express";
import { postLink, getLink, getAllLinks } from "../Links/urlCrud.js";
const router = express.Router();

router.get("/:shortLink", getLink);
router.post("/link", postLink);
router.get("/", getAllLinks)
// router.post("/delete/:short-url", deleteLink);
// router.get("/:url")

export default router