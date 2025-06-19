import { useEffect } from "react";
import { ROUTES } from "../../shared/paths"
import { BASE_API } from "../../shared/paths";
/*Tự động login khi vừa bật web, nếu có sẵn token 
(tức đã từng đăng nhập trước rồi) thì tự động login */
export const autoLogin = () => {
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");

    if (token) {
      handleAutoLogin(token);
    }
    // else{
    //   window.location.href = ROUTES.USER.HOME;
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
        
        window.location.href = ROUTES.USER.HOME;
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

/* Hỗ trợ login */
export const handleLogin = async (
  e: React.FormEvent,
  email: string,
  password: string,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  navigate: (path: string) => void  // Thêm dòng này
) => {
  e.preventDefault();

  try {
    const response = await fetch(`${BASE_API}user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setIsError(true);
      setError("Tài khoản hoặc mật khẩu không chính xác.");
      return;
    }

    const data = await response.json();
    const role = data.user.role;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ Dùng navigate để điều hướng nội bộ (không bị lỗi 404 khi deploy)
    if (role === "admin") {
      navigate(ROUTES.MANAGER.HOME);
    } else if (role === "user") {
      navigate(ROUTES.USER.HOME);
    } else if (role === "employee") {
      navigate(ROUTES.EMPLOYEE.ORDER);
    }
  } catch (error) {
    setIsError(true);
    setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
  }
};



 
