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
    },
}

export const API = {
};