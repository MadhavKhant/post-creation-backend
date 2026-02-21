import { cache } from "../cache/memoryCache.js";
import { readPosts } from "../config/fileOperations.js";

// Get Feed (Cursor Pagination)
export function getFeedController(req, res) {
  const { cursor, limit = 5 } = req.query;

  const cacheKey = `feed:${cursor}:${limit}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json({
      ...cachedData,
      fromCache: true,
    });
  }

  const posts = readPosts();
  const sorted = posts.sort((a, b) => b.createdAt - a.createdAt);

  let startIndex = 0;

  if (cursor) {
    const index = sorted.findIndex((p) => p.id === cursor);
    if (index !== -1) startIndex = index + 1;
  }

  const paginated = sorted.slice(startIndex, startIndex + Number(limit));

  const nextCursor =
    paginated.length === Number(limit)
      ? paginated[paginated.length - 1].id
      : null;

  const result = {
    data: paginated,
    nextCursor,
  };

  cache.set(cacheKey, result);

  res.json({
    result,
    fromCache: false,
  });
}