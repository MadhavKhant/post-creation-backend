import { cache } from "../cache/memoryCache.js";
import { readPosts, writePosts } from "../config/fileOperations.js";

// Like / Unlike Post
export function toggleLikeController(req, res) {
  const { postId } = req.params;
  const { userId } = req.body;

  const posts = readPosts();
  const post = posts.find((p) => p.id === postId);

  if (!post) return res.status(404).json({ message: "Post not found" });

  const alreadyLiked = post.likes.includes(userId);

  if (alreadyLiked) {
    post.likes = post.likes.filter((id) => id !== userId);
  } else {
    post.likes.push(userId);
  }

  writePosts(posts);
  cache.clear();

  res.json({ likesCount: post.likes.length });
}