import React from "react";
import Home from "../pages/Home/home";
import Header from "../components/Header";
import { I_Routes } from "../types";

import Footer from "../components/Footer";

import ProductManagement from "../pages/Admin/ProductManagement/product-management";
import UserManagement from "../pages/Admin/UserManagement/user-management";
import OrderManagement from "../pages/Admin/OrderManagement/order-management";
import SignIn from "../pages/Auth/Login/Login";

export const routes: I_Routes[] = [
  {
    title: "Home",
    path: "/",
    element: <Home />,
  },
  {
    title: "UserManagement",
    path: "/user-management",
    element: <UserManagement />,
  },
  {
    title: "ProductManagement",
    path: "/product-management",
    element: <ProductManagement />,
  },
  {
    title: "OrderManagement",
    path: "/order-management",
    element: <OrderManagement />,
  },
  {
    title: "SignIn",
    path: "/singin",
    element: <SignIn />,
  },
];
