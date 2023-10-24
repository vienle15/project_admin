import React from "react";
import Home from "../pages/Home/home";
import { I_Routes } from "../types";
import ProductManagement from "../pages/Admin/ProductManagement/product-management";
import UserManagement from "../pages/Admin/UserManagement/user-management";
import OrderManagement from "../pages/Admin/OrderManagement/order-management";
import SignIn from "../pages/Auth/Login/Login";
import Category from "../pages/Admin/Category/Category";

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
    title: "Category",
    path: "/category",
    element: <Category />,
  },
  {
    title: "SignIn",
    path: "/singin",
    element: <SignIn />,
  },
];
