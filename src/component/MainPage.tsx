import { Outlet, useNavigate, Link } from "react-router-dom";
import { publicAPI } from "../utils/api";

const MainPage = () => {
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const resp = await publicAPI.post("/auth/logout");
      await localStorage.removeItem("userType");
      await localStorage.removeItem("accessToken");
      if (resp?.data?.message) {
        alert(resp?.data?.message);
      }

      navigate("/login", { replace: true });
    } catch (error) {
      if (error?.message) {
        alert(error.message);
      }
      console.error(error);
    }
  };

  return (
    <>
      <div className="container flex align-items-center justify-content-between p-3">
        <h1 className="my-2">Management site</h1>

        <Link to="/profileData">Profile-Data</Link>
        <Link to="/asach-kahitari">asach-kahitari</Link>
        <Link to="/asach">asach</Link>
        <button onClick={onSubmit}>Log out</button>
      </div>
      <hr />
      <Outlet />
    </>
  );
};

export default MainPage;
