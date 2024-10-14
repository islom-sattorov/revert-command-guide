import { CLIENT_ROUTES } from "@constants/index";
import { Login } from "@features/auth";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminRouter } from "./AdminRoute";
import { GuestRoute } from "./GuestRoute";
import { PrivateRouter } from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: CLIENT_ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: CLIENT_ROUTES.ALL,
        element: <Navigate to={CLIENT_ROUTES.LOGIN} />,
      },
    ],
  },
  {
    element: <PrivateRouter />,
    children: [
      {
        element: <AdminRouter />,
        children: [],
      },
    ],
  },
]);
