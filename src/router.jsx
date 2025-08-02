import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/signin";
import Dashboard from "./routes/Dashboard";
import Header from "./components/header";
import Signup from "./components/signup";
import RootRedirect from "./routes/RootRedirect";
import ProtectedRoute from "./routes/ProtectedRoute";

export const router = createBrowserRouter([
  {path: "/", element: <RootRedirect />},
  {path: "/signin", element: <Signin />},
  {path: "/signup", element: <Signup />},
  {path: "/dashboard", element: (<ProtectedRoute> <Header /> <Dashboard /> </ProtectedRoute>)}
]);
