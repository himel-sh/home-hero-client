import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
  },
  {
    path: "/auth",
    element: <h1>Authentication Layout</h1>,
  },
  {
    path: "/service",
    element: <h1>Service Page</h1>,
  },
  {
    path: "/*",
    element: <h1>404</h1>,
  },
]);

export default router;
