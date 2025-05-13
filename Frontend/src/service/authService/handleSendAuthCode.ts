export const sendOtp = async (email: string) => {
    const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    
      if (!res.ok) throw new Error("Lỗi khi gửi mã xác thực.");
      return true;
}

export const verifyOtp = async (email: string, otp: string) => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
  
    const data = await res.json();
    return data;
}


