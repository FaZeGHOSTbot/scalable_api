import { useState } from "react";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Server not reachable ❌");
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