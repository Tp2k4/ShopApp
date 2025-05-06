import { Box, Line } from "../shared/components/ui";
import { Button, CancelButton } from "../shared/components/button";
import { InputField } from "../shared/components/form";
import { handleResetPassword } from "../service/authService/handleResetPassword";
import { ROUTES } from "../shared/paths";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ResetPassword() {
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
