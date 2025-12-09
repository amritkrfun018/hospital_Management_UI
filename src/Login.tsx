import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
useEffect(() => {
  async function checkCookie() {
    const res = await fetch("https://health-care-management-auth-service.onrender.com/auth/validate", {
      method: "GET",
      credentials: "include"
    });

    if (res.ok) {
      navigate("/hospital_Management_UI/", { replace: true });
    }
  }

  checkCookie();
}, []);
  // No more token checking — cookies handle it!

  const handleLogin = async () => {
    if (!username || !password) {
      console.warn("Missing username or password");
      return;
    }

    try {
      const response = await fetch("https://health-care-management-auth-service.onrender.com/auth/patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",  // 🔥 CRITICAL: allow browser to receive cookie
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        console.error("Login failed");
        return;
      }

      // Don't read any token — httpOnly cookie is automatically stored by browser
      console.log("Login successful via cookie");

      navigate("/hospital_Management_UI/", { replace: true });

    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <div className="outerdiv">
      <div className="login_box">
        <label  className="label" id="username_label">Username</label>
        <input
          type="text"
          id="username"
          placeholder="username/email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="label" id="password_label">Password</label>
        <input
          type="password"
          id="password"
          placeholder="•••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login_btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
