
import { ROUTES } from "../../shared/paths";

export const handleVerifyOtp = async (
  e: React.FormEvent, 
  email: string | null,
  otp: string,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  navigate: (path: string) => void
) => {

  e.preventDefault();

  if (otp.length !== 6) {
    setIsError(true);
    setError("Mã xác thực phải có 6 ký tự.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8020/api/v1/gmshop/user/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    }); 

    if (response.ok) {
      navigate(`${ROUTES.AUTH.RESET_PASSWORD}?email=${email}`); 
    } else {
      setIsError(true);
      setError("Mã OTP không hợp lệ hoặc đã hết hạn.");
    }
  } catch (err) {
    setIsError(true);
    setError("Lỗi khi fetch kiểm tra OTP.");
  }
};
