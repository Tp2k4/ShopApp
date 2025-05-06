import {ROUTES} from "../../shared/paths"

export const handleLogin = async (
    e: React.FormEvent,   
    username: string,
    password: string,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt_token");

    try{
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
             },
            body: JSON.stringify({ username, password }),
        });
      
        if (!response.ok) {
            setIsError(true);
            setError("Tài khoảng hoặc mật khẩu không chính xác.");
            return;
        }
    
        const data = await response.json();
        const role = data.role;
    
        if (role === "manager") {
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



