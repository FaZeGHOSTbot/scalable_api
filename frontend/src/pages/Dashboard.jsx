import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

export default function Dashboard({ token, setToken }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setMessage("");

    try {
      const payload = await api.listTasks({
        token,
        page,
        limit,
        search,
        sortBy: "createdAt",
        order: "desc"
      });

      setTasks(payload.data || []);
      setMeta(payload.meta || { total: 0, totalPages: 1 });
    } catch (err) {
      setMessage(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [token, page, limit, search]);

  const createTask = async () => {
    if (!title) {
      setMessage("Task title is required");
      return;
    }

    try {
      const created = await api.createTask({ token, title });
      setTasks((prev) => [created, ...prev.slice(0, Math.max(limit - 1, 0))]);
      setMeta((prev) => ({
        ...prev,
        total: (prev.total || 0) + 1,
        totalPages: Math.max(1, Math.ceil(((prev.total || 0) + 1) / limit))
      }));
      setMessage("Task added");
      setTitle("");
    } catch (err) {
      setMessage(err.message || "Task creation failed");
    }
  };

  const deleteTask = async (id) => {
    const previous = tasks;
    setTasks((prev) => prev.filter((task) => task._id !== id));

    try {
      const data = await api.deleteTask({ token, id });
      setMeta((prev) => ({
        ...prev,
        total: Math.max((prev.total || 1) - 1, 0),
        totalPages: Math.max(1, Math.ceil(Math.max((prev.total || 1) - 1, 0) / limit))
      }));
      setMessage(data.message || "Task deleted");
    } catch (err) {
      setTasks(previous);
      setMessage(err.message || "Delete failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const taskCountLabel = useMemo(() => {
    const total = meta.total || 0;
    return `${total} task${total === 1 ? "" : "s"}`;
  }, [meta.total]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{taskCountLabel}</p>

      <button onClick={logout}>Logout</button>

      <br /><br />

      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" />
      <button onClick={createTask}>Add</button>

      <br /><br />

      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Search tasks"
      />

      {message && <p>{message}</p>}
      {loading && <p>Loading tasks...</p>}

      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            {t.title}
            <button onClick={() => deleteTask(t._id)}>❌</button>
          </li>
        ))}
      </ul>

      <div>
        <button disabled={page <= 1 || loading} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <span>
          Page {page} / {meta.totalPages || 1}
        </span>
        <button
          disabled={loading || page >= (meta.totalPages || 1)}
          onClick={() => setPage((prev) => Math.min(prev + 1, meta.totalPages || 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}