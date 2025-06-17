import {ROUTES} from "../../shared/paths"

export const handleResetPassword = async (
    e: React.FormEvent,   
    email: string|null,
    new_password: string,
    newPasswordConfirm: string,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    navigate: (path: string) => void
) => {
    e.preventDefault();

    if(new_password !== newPasswordConfirm){
        setIsError(true);
        setError("Mật khẩu không trùng khớp.")
        return;
    }
    if (!new_password || !newPasswordConfirm ) {
        setIsError(true);
        setError("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    try{
        const response = await fetch("https://gm-12tk.onrender.com/api/v1/gmshop/user/reset-password", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, new_password})
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



