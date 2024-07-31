import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function ProfileUpdatePage() {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const formEntries = Object.fromEntries(formData.entries());
    const { username, email, password } = formEntries;

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
      });
      updateUser(res.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={currentUser.avatar || "/noavatar.png"}
          alt=""
          className="avatar"
        />
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default ProfileUpdatePage;