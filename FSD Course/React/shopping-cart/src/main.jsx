import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import "./index.css";

import Home from "./pages/Home.jsx";
import Layout from "./layouts/Layout.jsx";

import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
