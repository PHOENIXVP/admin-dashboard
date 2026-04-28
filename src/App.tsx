import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routing/routes";
import "./App.css";

export const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
