import { useEffect, useState } from "react";
import { authAPI } from "../utils/api";

const ProfileData = () => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    console.log("pp");

    const getProfile = async () => {
      const resp = await authAPI.get("/api/profile", {
        withCredentials: true,
      });
      if (resp?.data) {
        setProfile(resp?.data);
      }
    };
    getProfile();
  }, []);

  return <> {profile && JSON.stringify(profile)}</>;
};

export default ProfileData;
