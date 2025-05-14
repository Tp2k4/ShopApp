import { Box, Line } from "../shared/components/ui";
import { Button, CancelButton } from "../shared/components/button";
import { InputField } from "../shared/components/form";
import { handleForgotPassword } from "../service/authService/handleForgotPassword";
import { ROUTES } from "../shared/paths";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Box
        width="350px"
        height="w-auto"
        className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
      >
        {/*  */}
        <div className="heading3 font-semibold">Tìm kiếm tài khoản</div>
        <Line width="w-full" />

        {/*  */}
        <div>
          Vui lòng nhập email hoặc số điện thoại di động để tìm kiếm tài khoảng
          của bạn
        </div>

        <form
          className="flex flex-col gap-[var(--medium-gap)] "
          onSubmit={(e) =>
            handleForgotPassword(e, inputEmail, setIsError, setError, navigate)
          }
        >
          <div className="flex flex-col gap-[var(--small-gap)]">
            <InputField
              value={inputEmail}
              onChange={(e: any) => setInputEmail(e.target.value)}
              width="w-full"
              type="text"
              placeholder="sdt, email"
            />
            {isError && <p className="caption text-red-400 px-2">{error}</p>}
          </div>
          <Line width="w-full" />
          {/*  */}
          <div className="flex justify-end gap-[var(--small-gap)]">
            <CancelButton
              text="Hủy"
              width="w-auto"
              onClick={() => navigate(ROUTES.AUTH.LOGIN)}
            />
            <Button type="submit" text="Tìm kiếm" width="w-auto" />
          </div>
        </form>
      </Box>
    </div>
  );
}

export default ForgotPassword;

// import { SetStateAction, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Box from "../shared/components/ui/Box";
// import Line from "../shared/components/ui/Line";
// import Button from "../shared/components/button/Button";
// import CancelButton from "../shared/components/button/CancelButton";
// import InputField from "../shared/components/form/InputField";

// function ForgotPassword() {
//   const navigate = useNavigate();
//   const [identifier, setIdentifier] = useState("");

//   const handleSubmit = async () => {
//     if (!identifier) {
//       alert("Vui lòng nhập số điện thoại hoặc email.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:8020/api/v1/gmshop/user/forgot-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: identifier }),
//       });

//       if (res.ok) {
//         const result = await res.text();
//         console.log("Phản hồi từ server:", result);

//         // Chuyển sang trang nhập OTP, bạn có thể truyền thêm dữ liệu nếu cần
//         navigate("/send-auth-code", { state: { identifier } });
//         localStorage.setItem("email", identifier);
//       } else {
//         const errorText = await res.text();
//         alert(errorText);
//       }
//     } catch (error) {
//       console.error("Lỗi kết nối:", error);
//       alert("Không thể kết nối tới máy chủ.");
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex justify-center items-center">
//       <Box
//         width="350px"
//         height="w-auto"
//         className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
//       >
//         <div className="heading3 font-semibold">Tìm kiếm tài khoản</div>
//         <Line width="w-full" />

//         <div>
//           Vui lòng nhập email hoặc số điện thoại di động để tìm kiếm tài khoản
//           của bạn.
//         </div>

//         <InputField
//           width="w-full"
//           type="text"
//           placeholder="Số điện thoại hoặc email"
//           value={identifier}
//           onChange={(e: { target: { value: SetStateAction<string>; }; }) => setIdentifier(e.target.value)}
//         />

//         <Line width="w-full" />

//         <div className="flex justify-end gap-[var(--small-gap)]">
//           <CancelButton
//             text="Hủy"
//             width="w-auto"
//             onClick={() => navigate("/login")}
//           />
//           <Button
//             type="button"
//             text="Tìm kiếm"
//             width="w-auto"
//             onClick={handleSubmit}
//           />
//         </div>
//       </Box>
//     </div>
//   );
// }

// export default ForgotPassword;
