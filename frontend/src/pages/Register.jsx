import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.status === 201) {
        setMessage("✅ Registered successfully!");
      } else {
        setMessage(data.message || "Error occurred");
      }
    } catch {
      setMessage("Server error ❌");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <br />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <br />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <br />

      <button onClick={handleRegister}>Register</button>

      {message && <p>{message}</p>}
    </div>
  );
}