import Box from "../shared/components/ui/Box";
import Line from "../shared/components/ui/Line";
import Button from "../shared/components/button/Button";

import { useNavigate } from "react-router-dom";

function ChangePassSuccess() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Box
        width="350px"
        height="auto"
        className="items-center flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
      >
        <div className="heading3 font-semibold">Đổi mật khẩu thành công!</div>
        <Line width="100%" />
        <div>Mật khẩu của bạn đã được đổi thành công!</div>
        <Button
          onClick={() => navigate("/login")}
          type="button"
          text="Quay về trang đăng nhập"
          width="180px"
        />
      </Box>
    </div>
  );
}

export default ChangePassSuccess;
