import { Box, Line } from "../shared/components/ui";
import { Button } from "../shared/components/button";
import { ROUTES } from "../shared/paths";

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
        <Line width="w-full" />
        <div>Mật khẩu của bạn đã được đổi thành công!</div>
        <Button
          onClick={() => navigate(ROUTES.AUTH.LOGIN)}
          type="button"
          text="Quay về trang đăng nhập"
          width="w-auto"
        />
      </Box>
    </div>
  );
}

export default ChangePassSuccess;
