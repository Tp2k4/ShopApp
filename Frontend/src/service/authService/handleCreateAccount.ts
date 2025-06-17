import {ROUTES} from "../../shared/paths"

export const handleCreateAccount = async (
    e: React.FormEvent, 
    fullname: string,
    date_of_birth: string,
    gender: string,
    phone_number: string,
    email: string,
    password: string,
    address: string,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    navigate: (path: string) => void
) => {

    e.preventDefault();

    if (!fullname.trim() ||
        !date_of_birth.trim() ||
        // !gender.trim() ||
        !phone_number.trim() ||
        !email.trim() ||
        !password.trim() ||
        !address.trim()
    ) {
        setIsError(true);
        setError("Vui lòng điền thông tin đầy đủ.");
        return;
    }

    const is_active = 1
    const role_id = 2
    const facebook_account_id = 0
    const google_account_id = 0

    try {
        const response = await fetch("https://gm-12tk.onrender.com/api/v1/gmshop/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullname,
                date_of_birth,
                // gender,
                phone_number,
                email,
                password,
                address,
                is_active,
                role_id,
                facebook_account_id ,
                google_account_id 
            }), 
        });

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = Array.isArray(errorData)
                ? errorData.join(" | ") // lỗi từ @Valid: trả về mảng lỗi
                : errorData?.message || "Đã xảy ra lỗi.";

            setIsError(true);
            setError(errorMessage);
            return;
        }

        // const data = await response.json();
        // console.log("Tài khoản tìm thấy:", data);

        navigate(`${ROUTES.AUTH.LOGIN}`);

    } catch (error) {
        setIsError(true);
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
};

