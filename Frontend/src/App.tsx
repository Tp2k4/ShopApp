import {
  Login,
  ForgotPassword,
  ResetPassword,
  SendAuthCode,
  CreateAccount,
  ChangePassSuccess,
} from "./auth";
import {
  Home,
  Account,
  Product,
  Sale,
  Inventory,
  Statistics,
  Order,
} from "./manager/pages";
import { OrderEmployee, OrderConfirmation } from "./employee/pages";
import { autoLogin } from "./service/authService";
import { ROUTES } from "./shared/paths";

import BuyHistory from "./user/pages/BuyHistory";
import UserProfile from "./user/pages/UserProfile";
import UserHome from "./user/pages/UserHome";
import ItemsDetail from "./user/pages/ItemsDetail";
import ShoppingCart from "./user/pages/ShoppingCart";

import "boxicons/css/boxicons.min.css";
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to={ROUTES.USER.HOME} replace /> },

  { path: ROUTES.AUTH.LOGIN, element: <Login /> },
  { path: ROUTES.AUTH.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: ROUTES.AUTH.RESET_PASSWORD, element: <ResetPassword /> },
  { path: ROUTES.AUTH.CREATE_ACCOUNT, element: <CreateAccount /> },
  { path: ROUTES.AUTH.SEND_AUTH_CODE, element: <SendAuthCode /> },
  { path: ROUTES.AUTH.CHANGE_PASS_SUCCESS, element: <ChangePassSuccess /> },

  { path: ROUTES.MANAGER.HOME, element: <Home /> },
  { path: ROUTES.MANAGER.ACCOUNT, element: <Account /> },
  { path: ROUTES.MANAGER.ORDER, element: <Order /> },
  { path: ROUTES.MANAGER.PRODUCT, element: <Product /> },
  { path: ROUTES.MANAGER.SALE, element: <Sale /> },
  { path: ROUTES.MANAGER.INVENTORY, element: <Inventory /> },
  { path: ROUTES.MANAGER.STATISTICS, element: <Statistics /> },

  { path: ROUTES.EMPLOYEE.ORDER, element: <OrderEmployee /> },
  { path: ROUTES.EMPLOYEE.ORDER_CONFIRMATION, element: <OrderConfirmation /> },

  { path: ROUTES.USER.BUY_HISTORY, element: <BuyHistory /> },
  { path: ROUTES.USER.USER_PROFILE, element: <UserProfile /> },
  { path: ROUTES.USER.HOME, element: <UserHome /> },
  { path: ROUTES.USER.ITEMS_DETAIL, element: <ItemsDetail /> },

  { path: ROUTES.USER.SHOPPING_CART, element: <ShoppingCart /> },
]);

const App: React.FC = () => {
  autoLogin();

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
