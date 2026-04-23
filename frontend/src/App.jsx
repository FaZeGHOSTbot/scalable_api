import { Suspense, lazy, useState } from "react";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("login");

  if (token) {
    return (
      <Suspense fallback={<p>Loading dashboard...</p>}>
        <Dashboard token={token} setToken={setToken} />
      </Suspense>
    );
  }

  return (
    <div className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">Live demo stack</p>
        <h1>Scalable API</h1>
        <p className="hero-copy">
          A demo-ready auth and task platform showing modern React, robust REST APIs,
          performance tuning, and practical engineering workflow skills.
        </p>
        <div className="hero-stats">
          <span>Secure auth</span>
          <span>Optimized reads</span>
          <span>Graceful shutdown</span>
          <span>Fast frontend</span>
        </div>
      </section>

      <section className="auth-panel">
        <div className="tab-row">
          <button onClick={() => setPage("login")}>Login</button>
          <button onClick={() => setPage("register")}>Register</button>
        </div>

        <Suspense fallback={<p>Loading form...</p>}>
          {page === "login" && <Login setToken={setToken} />}
          {page === "register" && <Register />}
        </Suspense>
      </section>
    </div>
  );
}

export default App;