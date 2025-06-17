import { Box, Line } from "../shared/components/ui";
import { Button, CancelButton } from "../shared/components/button";
import { InputField } from "../shared/components/form";
import { handleVerifyOtp } from "../service/authService/handleVerifyOtp";
import { ROUTES } from "../shared/paths";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function SendAuthCode() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Box
        width="450px"
        height="h-auto"
        className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
      >
        {/*  */}
        <div className="heading3 font-semibold">Đặt lại mật khẩu của bạn</div>
        <Line width="w-full" />

        {/*  */}
        <div>
          Vui lòng kiểm tra điện thoại hoặc email để xem tin nhắn có mã. Mã của
          bạn có 6 ký tự.
        </div>

        {/*  */}
        <div className="flex flex-col items-start gap-[var(--small-gap)]">
          <form
            className="flex flex-col gap-[var(--medium-gap)]"
            onSubmit={(e) =>
              handleVerifyOtp(e, email, otp, setIsError, setError, navigate)
            }
          >
            <div className="flex flex-col gap-[var(--small-gap)]">
              <div className="w-full flex items-center gap-[var(--small-gap)]">
                <InputField
                  value={otp}
                  onChange={(e: any) => setOtp(e.target.value)}
                  className="w-1/2"
                  type="text"
                  placeholder="Nhập mã"
                />
                <div className="w-1/2">
                  Chúng tôi đã gửi mã cho bạn đến:{" "}
                  <span className="text-blue-500">{email}</span>
                </div>
                {isError && (
                  <p className="caption text-red-500 px-2">{error}</p>
                )}
              </div>
              <div>
                <Button type="submit" text="Gửi lại" width="w-auto" />
              </div>
            </div>

            {/*  */}
            <Line width="w-full" />
            <div className="flex justify-end gap-[var(--small-gap)]">
              <CancelButton
                text="Hủy"
                width="w-auto"
                onClick={() => navigate(ROUTES.AUTH.LOGIN)}
              />
              <Button type="submit" text="Tìm kiếm" width="w-auto" />
            </div>

            {/*  */}
          </form>
        </div>
      </Box>
    </div>
  );
}

export default SendAuthCode;

// import { useState } from "react";
// import Box from "../shared/components/ui/Box";
// import Line from "../shared/components/ui/Line";
// import Button from "../shared/components/button/Button";
// import CancelButton from "../shared/components/button/CancelButton";
// import InputField from "../shared/components/form/InputField";
// import Avatar from "../shared/components/ui/Avatar";
// import avatar from "../assets/avatar/avatar.jpg";

// import { useNavigate } from "react-router-dom";

// function SendAuthCode() {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("000000001");

//   const handleAuthCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAuthCode(e.target.value);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (otp.length !== 6) {
//       setError("Mã xác thực phải có 6 ký tự.");
//       return;
//     }

//     const email = localStorage.getItem("email") || "";
//     if (!email) {
//       setError("Không tìm thấy email để xác thực.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:8020/api/v1/gmshop/user/verify-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, otp: otp }),
//       });

//       if (res.ok) {
//         const result = await res.text();
//         console.log("OTP hợp lệ:", result);
//         navigate("/reset-password");
//       } else {
//         const errorText = await res.text();
//         setError(errorText || "Mã xác thực không hợp lệ.");
//       }
//     } catch (err) {
//       console.error("Lỗi xác thực OTP:", err);
//       setError("Không thể kết nối tới máy chủ.");
//     }
//   };

//   const handleResendCode = async () => {
//     const email = localStorage.getItem("email") || "";

//     if (!email) {
//       alert("Không tìm thấy email trong bộ nhớ!");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:8020/api/v1/gmshop/user/forgot-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: email }),
//       });

//       if (res.ok) {
//         // Nếu gửi thành công
//         console.log("Gửi lại mã xác thực đến: ", email);
//         alert("Mã xác thực đã được gửi lại đến email của bạn!");
//       } else {
//         // Nếu có lỗi từ phía server
//         const errorText = await res.text();
//         alert(`Lỗi khi gửi mã: ${errorText}`);
//       }
//     } catch (error) {
//       console.error("Lỗi kết nối:", error);
//       alert("Không thể kết nối tới máy chủ. Vui lòng thử lại sau.");
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex justify-center items-center">
//       <Box
//         width="450px"
//         height="auto"
//         className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
//       >
//         <div className="heading3 font-semibold">Đặt lại mật khẩu của bạn</div>
//         <Line width="w-full" />

//         <div>
//           Vui lòng kiểm tra điện thoại hoặc email để xem tin nhắn có mã. Mã của
//           bạn có 6 ký tự.
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="flex flex-col items-start gap-[var(--small-gap)]">
//             <div className="w-full flex items-center gap-[var(--small-gap)]">
//               <InputField
//                 className="w-1/2"
//                 type="text"
//                 placeholder="Nhập mã"
//                 value={otp}
//                 onChange={handleAuthCodeChange}
//               />
//               <div className="w-1/2">
//                 Chúng tôi đã gửi mã cho bạn đến:{" "}
//                 <span className="text-blue-500">{phoneNumber}</span>
//               </div>
//             </div>

//             {error && <div className="text-red-500 text-sm">{error}</div>}

//             <Button type="submit" text="Xác nhận" width="w-auto" />
//             <Button
//               type="button"
//               text="Gửi lại"
//               width="w-auto"
//               onClick={handleResendCode}
//             />
//           </div>
//         </form>

//         {/* Avatar */}
//         <div className="w-full flex flex-col items-center gap-[var(--small-gap)]">
//           <Avatar src={avatar} />
//           <div className="heading3">Lê Võ</div>
//         </div>

//         <Line width="w-full" />
//         <div className="flex justify-end gap-[var(--small-gap)]">
//           <CancelButton
//             text="Hủy"
//             width="w-auto"
//             onClick={() => navigate("/login")}
//           />
//         </div>
//       </Box>
//     </div>
//   );
// }

// export default SendAuthCode;
