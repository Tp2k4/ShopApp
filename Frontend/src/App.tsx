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
import Payment from "./user/pages/Payment";
import FinishOrder from "./user/pages/FinishOrder";

import "boxicons/css/boxicons.min.css";
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// const router = createBrowserRouter([
//   { path: "/", element: <Navigate to={ROUTES.USER.HOME} replace /> },

//   { path: ROUTES.AUTH.LOGIN, element: <Login /> },
//   { path: ROUTES.AUTH.FORGOT_PASSWORD, element: <ForgotPassword /> },
//   { path: ROUTES.AUTH.RESET_PASSWORD, element: <ResetPassword /> },
//   { path: ROUTES.AUTH.CREATE_ACCOUNT, element: <CreateAccount /> },
//   { path: ROUTES.AUTH.SEND_AUTH_CODE, element: <SendAuthCode /> },
//   { path: ROUTES.AUTH.CHANGE_PASS_SUCCESS, element: <ChangePassSuccess /> },

//   { path: ROUTES.MANAGER.HOME, element: <Home /> },
//   { path: ROUTES.MANAGER.ACCOUNT, element: <Account /> },
//   { path: ROUTES.MANAGER.ORDER, element: <Order /> },
//   { path: ROUTES.MANAGER.PRODUCT, element: <Product /> },
//   { path: ROUTES.MANAGER.SALE, element: <Sale /> },
//   { path: ROUTES.MANAGER.INVENTORY, element: <Inventory /> },
//   { path: ROUTES.MANAGER.STATISTICS, element: <Statistics /> },

//   { path: ROUTES.EMPLOYEE.ORDER, element: <OrderEmployee /> },
//   { path: ROUTES.EMPLOYEE.ORDER_CONFIRMATION, element: <OrderConfirmation /> },

//   { path: ROUTES.USER.BUY_HISTORY, element: <BuyHistory /> },
//   { path: ROUTES.USER.USER_PROFILE, element: <UserProfile /> },
//   { path: ROUTES.USER.HOME, element: <UserHome /> },
//   { path: ROUTES.USER.ITEMS_DETAIL, element: <ItemsDetail /> },

//   { path: ROUTES.USER.SHOPPING_CART, element: <ShoppingCart /> },
//   { path: ROUTES.USER.PAYMENT, element: <Payment /> },
//   { path: ROUTES.USER.FINISH_ORDER, element: <FinishOrder /> },
// ]);

// const App: React.FC = () => {
//   autoLogin();

//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   );
// };

// export default App;

import PrivateRoute from "./shared/utils/PrivateRoute"; // import đúng path của bạn

const router = createBrowserRouter([
  { path: "/", element: <Navigate to={ROUTES.USER.HOME} replace /> },

  // Public Auth Routes
  { path: ROUTES.AUTH.LOGIN, element: <Login /> },
  { path: ROUTES.AUTH.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: ROUTES.AUTH.RESET_PASSWORD, element: <ResetPassword /> },
  { path: ROUTES.AUTH.CREATE_ACCOUNT, element: <CreateAccount /> },
  { path: ROUTES.AUTH.SEND_AUTH_CODE, element: <SendAuthCode /> },
  { path: ROUTES.AUTH.CHANGE_PASS_SUCCESS, element: <ChangePassSuccess /> },

  // ✅ Public route – không cần đăng nhập
  { path: ROUTES.USER.HOME, element: <UserHome /> },

  // ✅ Manager - cần token + role ADMIN
  {
    path: ROUTES.MANAGER.HOME,
    element: (
      <PrivateRoute roles={["ADMIN"]}>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.MANAGER.ACCOUNT,
    element: (
      <PrivateRoute roles={["ADMIN"]}>
        <Account />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.MANAGER.ORDER,
    element: (
      <PrivateRoute roles={["ADMIN"]}>
        <Order />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.MANAGER.PRODUCT,
    element: (
      <PrivateRoute roles={["ADMIN"]}>
        <Product />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.MANAGER.SALE,
    element: (
      <PrivateRoute roles={["ADMIN"]}>
        <Sale />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.MANAGER.INVENTORY,
    element: (
      <PrivateRoute roles={["ADMIN"]}>
        <Inventory />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.MANAGER.STATISTICS,
    element: (
      <PrivateRoute roles={["ADMIN"]}>
        <Statistics />
      </PrivateRoute>
    ),
  },

  // ✅ Employee - cần role EMPLOYEE
  {
    path: ROUTES.EMPLOYEE.ORDER,
    element: (
      <PrivateRoute roles={["EMPLOYEE"]}>
        <OrderEmployee />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.EMPLOYEE.ORDER_CONFIRMATION,
    element: (
      <PrivateRoute roles={["EMPLOYEE"]}>
        <OrderConfirmation />
      </PrivateRoute>
    ),
  },

  // ✅ User - cần role USER
  {
    path: ROUTES.USER.BUY_HISTORY,
    element: (
      <PrivateRoute roles={["USER"]}>
        <BuyHistory />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.USER.USER_PROFILE,
    element: (
      <PrivateRoute roles={["USER"]}>
        <UserProfile />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.USER.ITEMS_DETAIL,
    element: (
      <PrivateRoute roles={["USER"]}>
        <ItemsDetail />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.USER.SHOPPING_CART,
    element: (
      <PrivateRoute roles={["USER"]}>
        <ShoppingCart />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.USER.PAYMENT,
    element: (
      <PrivateRoute roles={["USER"]}>
        <Payment />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.USER.FINISH_ORDER,
    element: (
      <PrivateRoute roles={["USER"]}>
        <FinishOrder />
      </PrivateRoute>
    ),
  },
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