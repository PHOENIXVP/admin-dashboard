import { Outlet, useNavigate } from "react-router-dom";
import useLocal from "../hooks/useLocal";

const MainPage = () => {
  const [currentUser, setCurrentUser] = useLocal("currentUser", null);
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
      <button onClick={onSubmit}>Log out</button>
      <hr />
      <Outlet />
    </>
  );
};

export default MainPage;
