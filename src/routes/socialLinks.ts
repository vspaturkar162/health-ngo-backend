import express from "express";
import { getSocialLinks, updateSocialLinks } from "../controllers/socialLinksController";
import { authenticate, authorizeAdmin } from "../middlewares/auths";

const router = express.Router();

router.get("/", getSocialLinks);
router.post("/", authenticate, authorizeAdmin, updateSocialLinks);

export default router;