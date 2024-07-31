import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(AuthContext);


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", { username, password });
      // localStorage.setItem("user", JSON.stringify(res.data));  // Store JWT token in local storage for future requests
      
      updateUser(res.data); // Update user in AuthContext
      
      console.log("User Login successfully:", res.data);
      setError(null); // Clear error message on successful registration
      navigate("/"); // Redirect to login page after successful registration
    } catch (err) {
      console.error(err);
      setError("Invalid Credentials !!");
    } finally {
      setIsLoading(false);
    }

    console.log("Logging user:", { username, password });
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <div className="error">{error}</div>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
