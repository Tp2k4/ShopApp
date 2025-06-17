import {ROUTES} from "../../shared/paths"

export const handleForgotPassword = async (
    e: React.FormEvent, 
    email: string,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    navigate: (path: string) => void
) => {

    e.preventDefault();

    if (!email.trim()) {
        setIsError(true);
        setError("Vui lòng nhập số điện thoại hoặc email.");
        return;
    }

    try {
        const response = await fetch("https://gm-12tk.onrender.com/api/v1/gmshop/user/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email}), 
        });

        if (!response.ok) {
            setIsError(true);
            setError("Không tìm thấy tài khoản.")
            return;
        }

        // const data = await response.json();
        // console.log("Tài khoản tìm thấy:", data);

        navigate(`${ROUTES.AUTH.SEND_AUTH_CODE}?email=${email}`);

    } catch (error) {
        setIsError(true);
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
};

