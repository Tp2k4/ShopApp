import { Box, Line } from "../shared/components/ui";
import { Button, CancelButton } from "../shared/components/button";
import { InputField } from "../shared/components/form";
import { handleResetPassword } from "../service/authService/handleResetPassword";
import { ROUTES } from "../shared/paths";

import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Box
        width="400px"
        height="auto"
        className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
      >
        <div className="heading3 font-semibold">Chọn mật khẩu mới</div>
        <Line width="w-full" />

        {/* */}
        <div>
          Tạo mật khẩu mới có tối thiểu 6 ký tự. Mật khẩu mạnh là mật khẩu kết
          hợp từ các ký tự, số và dấu câu.
        </div>

        <form
          className="flex flex-col gap-[var(--medium-gap)]"
          onSubmit={(e) =>
            handleResetPassword(
              e,
              email,
              newPassword,
              newPasswordConfirm,
              setIsError,
              setError,
              navigate
            )
          }
        >
          <div className="flex flex-col gap-[var(--small-gap)]">
            <InputField
              value={newPassword}
              onChange={(e: any) => setNewPassword(e.target.value)}
              type="password"
              placeholder="Điền mật khẩu mới"
            />
            <InputField
              value={newPasswordConfirm}
              onChange={(e: any) => setNewPasswordConfirm(e.target.value)}
              type="password"
              placeholder="Nhập lại mật khẩu mới"
            />
            {isError && <p className="caption text-red-500 px-2">{error}</p>}
          </div>
          <Line width="w-full" />
          {/* */}
          <div className="flex justify-end gap-[var(--small-gap)]">
            <CancelButton
              text="Hủy"
              width="w-auto"
              onClick={() => navigate(ROUTES.AUTH.LOGIN)}
            />
            <Button type="submit" width="w-auto" text="Xác nhận" />
          </div>
        </form>
      </Box>
    </div>
  );
}

export default ResetPassword;

// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Box from "../shared/components/ui/Box";
// import Line from "../shared/components/ui/Line";
// import Button from "../shared/components/button/Button";
// import CancelButton from "../shared/components/button/CancelButton";
// import InputField from "../shared/components/form/InputField";

// function ResetPassword() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const identifier = location.state?.identifier || localStorage.getItem("email"); // Lấy email/sdt từ state hoặc localStorage

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password.length < 6) {
//       alert("Mật khẩu phải có ít nhất 6 ký tự.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Mật khẩu nhập lại không khớp.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:8020/api/v1/gmshop/user/reset-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: identifier,
//           new_password: password,
//         }),
//       });

//       if (res.ok) {
//         alert("Đổi mật khẩu thành công!");
//         navigate("/login");
//       } else {
//         const err = await res.text();
//         alert(err);
//       }
//     } catch (err) {
//       console.error("Lỗi kết nối:", err);
//       alert("Không thể kết nối tới máy chủ.");
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex justify-center items-center">
//       <Box
//         width="400px"
//         height="auto"
//         className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
//       >
//         <div className="heading3 font-semibold">Chọn mật khẩu mới</div>
//         <Line width="w-full" />
//         <div>
//           Tạo mật khẩu mới có tối thiểu 6 ký tự. Mật khẩu mạnh là mật khẩu kết
//           hợp từ các ký tự, số và dấu câu.
//         </div>

//         <form className="flex flex-col gap-[var(--small-gap)]" onSubmit={handleSubmit}>
//           <InputField
//             type="password"
//             placeholder="Điền mật khẩu mới"
//             value={password}
//             onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
//           />
//           <InputField
//             type="password"
//             placeholder="Nhập lại mật khẩu mới"
//             value={confirmPassword}
//             onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setConfirmPassword(e.target.value)}
//           />
//           <Line width="w-full" />

//           <div className="flex justify-end gap-[var(--small-gap)]">
//             <CancelButton
//               text="Hủy"
//               width="w-auto"
//               onClick={() => navigate("/login")}
//             />
//             <Button type="submit" width="w-auto" text="Xác nhận" />
//           </div>
//         </form>
//       </Box>
//     </div>
//   );
// }

// export default ResetPassword;
