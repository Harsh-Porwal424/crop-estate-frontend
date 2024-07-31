import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
    
      const res = await apiRequest.post("/auth/register", { username, email, password });
      console.log("User registered successfully:", res.data);
      setError(null);  // Clear error message on successful registration
      navigate("/login");  // Redirect to login page after successful registration
    } catch (err) {
      console.error(err);
      setError("An error occurred while registering the user !!");
    }finally{
      setIsLoading(false);
    }

    console.log("Registering user:", { username, email, password });
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <div className="error">{error}</div>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;