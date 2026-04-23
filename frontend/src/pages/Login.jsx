import { useState } from "react";
import { api } from "../lib/api";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const data = await api.login({ email, password });

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage(err.message || "Server not reachable");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <br />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}