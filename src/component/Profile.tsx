import { useState, useEffect } from "react";
import LoginAccess from "./LoginAccess";
import api from "../utils/api";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setProfile(response.data);
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <LoginAccess />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {profile ? (
        <div>
          <p>ID: {profile.id}</p>
          <p>Username: {profile.username}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
