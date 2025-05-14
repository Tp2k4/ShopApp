import {ROUTES} from "../../shared/paths"

export const handleLogin = async (
    e: React.FormEvent,   
    phone_number: string,
    password: string,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
) => {
    e.preventDefault();

    // const token = localStorage.getItem("jwt_token");

    try{
        const response = await fetch("http://localhost:8020/api/v1/gmshop/user/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
             },
            body: JSON.stringify({ phone_number, password }),
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

    
        if (role === "admin") {
            window.location.href = ROUTES.MANAGER.HOME;
        } else if (role === "user") {
            //Cần chỉnh lại ROUTE
            window.location.href = ROUTES.USER.BUY_HISTORY;
        } else if (role === "employee") {
            window.location.href = ROUTES.EMPLOYEE.ORDER;
        }

    } catch (error) {
        setIsError(true);
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
};



