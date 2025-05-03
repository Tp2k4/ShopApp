import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import SendAuthCode from "./auth/SendAuthCode";
import CreateAccount from "./auth/CreateAccount";
import ChangePassSuccess from "./auth/ChangePassSuccess";

import Home from "./manager/Home";
import Account from "./manager/Account";
import Product from "./manager/Product";
import Sale from "./manager/Sale";
import Inventory from "./manager/Inventory";
import Statistics from "./manager/Statistics";

import Order from "./employee/Order";
import OrderConfirmation from "./employee/OrderConfirmation";

import "boxicons/css/boxicons.min.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/create-account", element: <CreateAccount /> },
  { path: "/send-auth-code", element: <SendAuthCode /> },
  { path: "/change-pass-success", element: <ChangePassSuccess /> },

  { path: "/home-manager", element: <Home /> },
  { path: "/account-manager", element: <Account /> },
  { path: "/product-manager", element: <Product /> },
  { path: "/sale-manager", element: <Sale /> },
  { path: "/inventory-manager", element: <Inventory /> },
  { path: "/statistics-manager", element: <Statistics /> },

  { path: "/employee/order", element: <Order /> },
  { path: "/employee/order-confirmation", element: <OrderConfirmation /> },
]);

const App: React.FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
