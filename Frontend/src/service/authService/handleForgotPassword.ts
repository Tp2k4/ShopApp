import {ROUTES} from "../../shared/paths"

export const handleForgotPassword = async (
    e: React.FormEvent, 
    inputEmail: string,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    navigate: (path: string) => void
) => {

    e.preventDefault();

    if (!inputEmail.trim()) {
        setIsError(true);
        setError("Vui lòng nhập số điện thoại hoặc email.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({inputEmail }), 
        });

        if (!response.ok) {
            setIsError(true);
            setError("Không tìm thấy tài khoảng.")
            return;
        }

        const data = await response.json();
        console.log("Tài khoản tìm thấy:", data);

        navigate(`${ROUTES.AUTH.SEND_AUTH_CODE}?email=${inputEmail}`);

    } catch (error) {
        setIsError(true);
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
};

