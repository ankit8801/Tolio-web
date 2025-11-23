// src/App.js
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Navbar from "./Navbar";
import RequireAuth from "./admin/RequireAuth";
import Suggest from "./Suggest";

// Lazy-load admin pages
const Login = React.lazy(() => import("./admin/Login"));
const Dashboard = React.lazy(() => import("./admin/Dashboard"));
const ManageTools = React.lazy(() => import("./admin/ManageTools"));
const ReviewSuggestions = React.lazy(() =>
  import("./admin/ReviewSuggestions")       // ✅ NEW PAGE
);

// Error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2>Something went wrong loading this section.</h2>
          <pre style={{ whiteSpace: "pre-wrap", color: "#a00" }}>
            {String(this.state.error)}
          </pre>
          <button onClick={() => window.location.reload()}>Reload app</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <ErrorBoundary>
        <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>

          <Routes>

            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/suggest" element={<Suggest />} />

            {/* Admin */}
            <Route path="/admin/login" element={<Login />} />

            <Route
              path="/admin/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            <Route
              path="/admin/tools"
              element={
                <RequireAuth>
                  <ManageTools />
                </RequireAuth>
              }
            />

            {/* ✅ USER SUGGESTIONS REVIEW PAGE */}
            <Route
              path="/admin/suggestions"
              element={
                <RequireAuth>
                  <ReviewSuggestions />
                </RequireAuth>
              }
            />

          </Routes>

        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
