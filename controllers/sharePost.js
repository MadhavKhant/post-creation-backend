import { cache } from "../cache/memoryCache.js";
import { readPosts, writePosts } from "../config/fileOperations.js";

// Share Post
export function sharePostController(req, res) {
  const { postId } = req.params;

  const posts = readPosts();
  const post = posts.find((p) => p.id === postId);

  if (!post) return res.status(404).json({ message: "Post not found" });

  post.shares += 1;

  writePosts(posts);
  cache.clear();

  res.json({ sharesCount: post.shares });
}