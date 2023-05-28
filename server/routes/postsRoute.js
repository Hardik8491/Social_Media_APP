import express from "express";
import { createPost, getFeedPosts, getUserPosts, likePost } from "../controllers/postController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// WRITE
router.post('/',verifyToken,createPost);
/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;