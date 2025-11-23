import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid login. Try again.");
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>

      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow"
      >
        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-3 bg-neutral-100 dark:bg-neutral-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4 bg-neutral-100 dark:bg-neutral-800"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          type="submit"
          className="
            w-full py-3 bg-lime-600 hover:bg-lime-700 text-white 
            rounded-lg font-semibold shadow
          "
        >
          Login
        </button>
      </form>
    </div>
  );
}
