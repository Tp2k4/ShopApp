import { useEffect } from "react";
import { ROUTES } from "../../shared/paths"

export const autoLogin = () => {
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");

    if (token) {
      handleAutoLogin(token);
    }
    // else{
    //   if (window.location.pathname !== "/auth/login")
    //     window.location.href = "/auth/login";
    // }
  }, []);

  const handleAutoLogin = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8080/verifyToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Token expired or invalid.");
      }

      const data = await response.json();
      const role = data.role;

      if (role === "admin") {
        window.location.href = ROUTES.MANAGER.HOME;
      } else if (role === "user") {
        //Cần chỉnh lại ROUTE
        window.location.href = ROUTES.USER.BUY_HISTORY;
      } else if (role === "employee") {
        window.location.href = ROUTES.EMPLOYEE.ORDER;
      }
      
    } catch (error) {
      console.error("Error during auto-login:", error);
      localStorage.removeItem("jwt_token");
      window.location.href = ROUTES.AUTH.LOGIN;
    }
  };
};

 
