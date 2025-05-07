import './App.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    console.log("Email:", email, "Password:", password);
    e.preventDefault();
    console.log("Sign In button is clicked");
    navigate("/HomePage");
    
  };

  return (

    <div className = "sign-in-box">
      <h2 className="sign-in">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="email">
          <label>Email</label>
          <input
            type="email"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="password">
          <label>Password</label>
          <input
            type="password"
            className="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
