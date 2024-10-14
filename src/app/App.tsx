import { AuthProvider } from "@providers/AuthProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export function App() {
  console.log("commit 1");
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
