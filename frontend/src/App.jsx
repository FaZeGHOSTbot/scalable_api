import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("login");

  if (token) return <Dashboard token={token} setToken={setToken} />;

  return (
    <div style={{ padding: 20 }}>
      <h1>Scalable API</h1>

      <button onClick={() => setPage("login")}>Login</button>
      <button onClick={() => setPage("register")}>Register</button>

      {page === "login" && <Login setToken={setToken} />}
      {page === "register" && <Register />}
    </div>
  );
}

export default App;