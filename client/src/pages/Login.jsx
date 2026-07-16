import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = () => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("admin", "true");

toast.success("Welcome Admin!");

navigate("/admin");
    } else {
     toast.error("Invalid Username or Password");
    }
  };

  return (
    <div className="login-container">

      <h1>👨‍🍳 Admin Login</h1>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>
        Login
      </button>

    </div>
  );
}

export default Login;