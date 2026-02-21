import { cache } from "../cache/memoryCache.js";
import { readPosts, writePosts } from "../config/fileOperations.js";
import { createComment } from "../model/postSchema.js"

// Add Comment
export function addCommentController(req, res) {
  const { postId } = req.params;
  const { userId, text } = req.body;

  const posts = readPosts();
  const post = posts.find((p) => p.id === postId);

  if (!post) return res.status(404).json({ message: "Post not found" });

  const comment = createComment({ userId, text });
  post.comments.push(comment);

  writePosts(posts);
  cache.clear();

  res.status(201).json(comment);
}