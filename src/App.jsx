// app.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard_page/Dashboard";
import { Nav } from "./layouts/Nav/Nav";
import Homepage from "./pages/home_page/home_page";
import Historypage from "./pages/history_page/Historypage";
import PlainLayout from "./layouts/Nav/Nav_empty";
import Login from "./pages/login_page/login_page";
import NavLayout from "./layouts/Nav/NavLayout";
import UpdatePage from "./pages/update_stock/UpdatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PlainLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/app",
    element: <NavLayout />,
    children: [
      {
        path: "home",
        element: <Homepage />,
      },
      {
        path: "History",
        element: <Historypage />,
      },
      {
        path: "Update",
        element: <UpdatePage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
