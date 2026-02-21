
class MemoryCache {
  constructor() {
    this.store = new Map();
  }

  // Get value from cache
  get(key) {
    return this.store.get(key);
  }

  // Set value in cache
  set(key, value) {
    this.store.set(key, value);
  }

  // Delete specific key
  del(key) {
    this.store.delete(key);
  }

  // Clear all cache
  clear() {
    this.store.clear();
  }
}

export const cache = new MemoryCache();