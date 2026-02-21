import { createPost } from "../model/postSchema.js";
import { cache } from "../cache/memoryCache.js";
import { readPosts, writePosts } from "../config/fileOperations.js";

// Create Post
export function createPostController(req, res) {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ message: "userId and content required" });
  }

  const posts = readPosts();
  const newPost = createPost({ userId, content });

  posts.unshift(newPost); // newest first
  writePosts(posts);

  cache.clear();

  res.status(201).json(newPost);
}
