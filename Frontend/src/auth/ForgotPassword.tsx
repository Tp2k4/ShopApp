import Box from "../shared/components/Box";
import Line from "../shared/components/Line";
import Button from "../shared/components/Button";
import CancelButton from "../shared/components/CancelButton";
import InputField from "../shared/components/InputField";

import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Box
        width="350px"
        height="auto"
        className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
      >
        {/*  */}
        <div className="heading3 font-semibold">Tìm kiếm tài khoản</div>
        <Line width="100%" />

        {/*  */}
        <div>
          Vui lòng nhập email hoặc số điện thoại di động để tìm kiếm tài khoảng
          của bạn
        </div>
        <InputField width="100%" type="text" placeholder="sdt, email" />
        <Line width="100%" />

        {/*  */}
        <div className="flex justify-end gap-[var(--small-gap)]">
          <CancelButton
            text="Hủy"
            width="50px"
            onClick={() => navigate("/login")}
          />
          <Button type="submit" text="Tìm kiếm" width="90px" />
        </div>
      </Box>
    </div>
  );
}

export default ForgotPassword;
