import { Outlet, useNavigate } from "react-router-dom";
import useLocal from "../hooks/useLocal";

const MainPage = () => {
  const [, setCurrentUser] = useLocal("currentUser", null);
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      await setCurrentUser(null);
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
        <button onClick={onSubmit}>Log out</button>
      </div>
      <hr />
      <Outlet />
    </>
  );
};

export default MainPage;
