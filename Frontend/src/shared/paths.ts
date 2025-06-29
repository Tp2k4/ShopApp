export const ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    CREATE_ACCOUNT: "/auth/create-account",
    SEND_AUTH_CODE: "/auth/send-auth-code",
    CHANGE_PASS_SUCCESS: "/auth/change-pass-success",
  },

  MANAGER: {
    HOME: "/manager",
    ACCOUNT: "/manager/account",
    ORDER: "/manager/order",
    INVENTORY: "/manager/inventory",
    PRODUCT: "/manager/product",
    SALE: "/manager/sale",
    STATISTICS: "/manager/statistics",
  },

  EMPLOYEE: {
    ORDER: "/employee/order",
    ORDER_CONFIRMATION: "/employee/order-confirmation",
  },

  USER: {
    BUY_HISTORY: "/user/buy-history",
    USER_PROFILE: "/user/profile",
    HOME: "/user/home",
    ITEMS_DETAIL: "/user/home/:category_id/:id",
    SHOPPING_CART: "/user/shopping-cart",
    PAYMENT: "/user/payment",
    FINISH_ORDER: "/user/finish-order",
  },
};

export const BASE_API = "https://gm-12tk.onrender.com/api/v1/gmshop/";
export const BASE_TEST_API = "http://localhost:8020/api/v1/gmshop/";