import express from "express";
import { getFeedController } from "../controllers/getFeed.js";
import { createPostController } from "../controllers/createPost.js";
import { toggleLikeController } from "../controllers/likeUnlike.js";
import { addCommentController } from "../controllers/comment.js";
import { sharePostController } from "../controllers/sharePost.js";

const router = express.Router();

// Create post
router.post("/createPost", createPostController);

// Get feed with cursor pagination
router.get("/feed", getFeedController);

// Like / Unlike
router.post("/like/:postId", toggleLikeController);

// Comment
router.post("/comment/:postId", addCommentController);

// Share
router.post("/share/:postId", sharePostController);

export default router;