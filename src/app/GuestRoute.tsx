import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

export const GuestRoute: FunctionComponent = () => {
  return <Outlet />;
};
