import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Home";
import Register from "../components/Register";
import MyServices from "../components/MyServices";
import AddService from "../components/AddService";
import MyBookings from "../components/MyBookings";
import PrivateRoute from "../components/PrivateRoute";
import Services from "../components/Services";
import ServiceDetails from "../components/ServiceDetails";
import MyServicesWrapper from "../contexts/MyServiceWrapper";
import Profile from "../components/Profile";
import Login from "../components/Login";
import Error404 from "../components/Error404";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Dashboard from "../components/Dashboard";
import RoleBasedRoute from "../components/RoleBasedRoute";

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
        path: "/login",
        Component: Login,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/about",
        Component: AboutUs,
      },
      {
        path: "/contact",
        Component: ContactUs,
      },
      {
        path: "*",
        Component: Error404,
      },
      {
        // Private Routes
        element: <PrivateRoute />,
        children: [
          {
            path: "/dashboard",
            Component: Dashboard,
          },
          {
            path: "/myServices",
            element: (
              <RoleBasedRoute allowedRoles={["provider"]}>
                <MyServicesWrapper />
              </RoleBasedRoute>
            ),
          },
          {
            path: "/addService",
            element: (
              <RoleBasedRoute allowedRoles={["provider"]}>
                <AddService />
              </RoleBasedRoute>
            ),
          },
          {
            path: "/myBookings",
            Component: MyBookings,
          },
          {
            path: "/services/:id",
            loader: ({ params }) =>
              fetch(
                `https://home-hero-server-zeta.vercel.app/services/${params.id}`
              ),
            Component: ServiceDetails,
          },
          {
            path: "/profile",
            Component: Profile,
          },
        ],
      },
    ],
  },
]);

export default router;
