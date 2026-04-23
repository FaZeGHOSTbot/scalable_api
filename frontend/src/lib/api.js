const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const DEFAULT_TIMEOUT = 10000;

const withTimeout = async (url, options = {}, timeoutMs = DEFAULT_TIMEOUT) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });
  } finally {
    clearTimeout(timeoutId);
  }
};

const request = async (path, options = {}) => {
  const res = await withTimeout(`${API_BASE_URL}${path}`, options);
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json() : null;

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
};

export const api = {
  login: (payload) => request("/api/v1/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  register: (payload) =>
    request("/api/v1/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  listTasks: ({ token, page = 1, limit = 10, search = "", sortBy = "createdAt", order = "desc" }) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
      sortBy,
      order
    });

    return request(`/api/v1/tasks?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  createTask: ({ token, title }) =>
    request("/api/v1/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    }),
  deleteTask: ({ token, id }) =>
    request(`/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
};
