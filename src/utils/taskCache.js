const cache = new Map();

const DEFAULT_TTL_MS = 30 * 1000;

const buildKey = (userId, query = {}) => {
  const normalized = Object.keys(query)
    .sort()
    .reduce((acc, key) => {
      acc[key] = query[key];
      return acc;
    }, {});

  return `${String(userId)}:${JSON.stringify(normalized)}`;
};

const getCachedTasks = (key) => {
  const entry = cache.get(key);

  if (!entry) {
    return null;
  }

  if (entry.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }

  return entry.value;
};

const setCachedTasks = (key, value, ttlMs = DEFAULT_TTL_MS) => {
  cache.set(key, {
    value,
    expiresAt: Date.now() + ttlMs
  });
};

const clearUserTaskCache = (userId) => {
  const prefix = `${String(userId)}:`;

  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }
};

module.exports = {
  buildKey,
  getCachedTasks,
  setCachedTasks,
  clearUserTaskCache
};
