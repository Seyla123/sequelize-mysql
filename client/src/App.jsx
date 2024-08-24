import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { CssBaseline } from "@mui/material";

function Layout() {
  return (
    <>
    <CssBaseline/>
      <Navbar />
      <Outlet /> {/* This is where the nested routes will be rendered */}
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,  // Use Layout as the base component
    children: [
      {
        path: "/",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
