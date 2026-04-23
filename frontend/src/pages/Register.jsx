import { useState } from "react";
import { api } from "../lib/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setMessage("All fields are required");
      return;
    }

    setMessage("");

    try {
      await api.register(form);
      setMessage("Registered successfully");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.message || "Server error");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input value={form.name} placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <br />
      <input value={form.email} placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <br />
      <input value={form.password} placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <br />

      <button onClick={handleRegister}>Register</button>

      {message && <p>{message}</p>}
    </div>
  );
}