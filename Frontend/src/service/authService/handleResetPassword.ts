import {ROUTES} from "../../shared/paths"

export const handleResetPassword = async (
    e: React.FormEvent,   
    newPassword: string,
    newPasswordConfirm: string,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    navigate: (path: string) => void
) => {
    e.preventDefault();

    if(newPassword !== newPasswordConfirm){
        setIsError(true);
        setError("Mật khẩu không trùng khớp.")
        return;
    }
    if (!newPassword || !newPasswordConfirm ) {
        setIsError(true);
        setError("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    try{
        const response = await fetch("http://localhost:8080/reset-password", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({newPassword, newPasswordConfirm})
        })

        if (!response.ok){
            setIsError(true);
            setError("Đã xảy ra lỗi. Vui lòng thử lại sau.")
            return;
        }

        console.log("Thay đổi mật khẩu thành công.");
        navigate(ROUTES.AUTH.CHANGE_PASS_SUCCESS)

    } catch (error) {
        setIsError(true);
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.")
    }
};



