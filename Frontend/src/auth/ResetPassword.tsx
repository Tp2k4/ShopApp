import Box from "../shared/components/ui/Box";
import Line from "../shared/components/ui/Line";
import Button from "../shared/components/button/Button";
import CancelButton from "../shared/components/button/CancelButton";
import InputField from "../shared/components/form/InputField";

import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Box
        width="400px"
        height="auto"
        className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
      >
        <div className="heading3 font-semibold">Chọn mật khẩu mới</div>
        <Line width="100%" />

        {/* */}
        <div>
          Tạo mật khẩu mới có tối thiểu 6 ký tự. Mật khẩu mạnh là mật khẩu kết
          hợp từ các ký tự, số và dấu câu.
        </div>
        <div className="flex flex-col gap-[var(--small-gap)]">
          <InputField type="password" placeholder="Điền mật khẩu mới" />
          <InputField type="password" placeholder="Nhập lại mật khẩu mới" />
        </div>
        <Line width="100%" />

        {/* */}
        <div className="flex justify-end gap-[var(--small-gap)]">
          <CancelButton
            text="Hủy"
            width="auto"
            onClick={() => navigate("/login")}
          />
          <Button type="submit" width="auto" text="Xác nhận" />
        </div>
      </Box>
    </div>
  );
}

export default ResetPassword;
