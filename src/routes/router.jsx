import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Home";
import Register from "../components/Register";
import MyServices from "../components/MyServices";
import AddService from "../components/AddService";
import MyBookings from "../components/MyBookings";
import PrivateRoute from "../components/PrivateRoute";

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
        // Private Routes
        element: <PrivateRoute />,
        children: [
          {
            path: "/myServices",
            Component: MyServices,
          },
          {
            path: "/addService",
            Component: AddService,
          },
          {
            path: "/myBookings",
            Component: MyBookings,
          },
        ],
      },
    ],
  },
]);

export default router;
