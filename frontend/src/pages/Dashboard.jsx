import { useEffect, useState } from "react";

export default function Dashboard({ token, setToken }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/v1/tasks", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setTasks(data);
  };

  const createTask = async () => {
    if (!title) {
      setMessage("Task title required ❌");
      return;
    }

    await fetch("http://localhost:5000/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    });

    setMessage("✅ Task added");
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    setMessage(data.message); //  shows "Admin access only"

    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <br /><br />

      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" />
      <button onClick={createTask}>Add</button>

      {message && <p>{message}</p>}

      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            {t.title}
            <button onClick={() => deleteTask(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}