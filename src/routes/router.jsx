import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Home";
import Register from "../components/Register";
import MyServices from "../components/MyServices";
import AddService from "../components/AddService";
import MyBookings from "../components/MyBookings";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/myServices",
        element: <MyServices />,
      },
      {
        path: "/addService",
        element: <AddService />,
      },
      {
        path: "/myBookings",
        element: <MyBookings />,
      },
    ],
  },
]);

export default router;
