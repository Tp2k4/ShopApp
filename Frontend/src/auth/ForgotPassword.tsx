import Box from "../shared/components/ui/Box";
import Line from "../shared/components/ui/Line";
import Button from "../shared/components/button/Button";
import CancelButton from "../shared/components/button/CancelButton";
import InputField from "../shared/components/form/InputField";

import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

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
        <InputField width="w-full" type="text" placeholder="sdt, email" />
        <Line width="w-full" />

        {/*  */}
        <div className="flex justify-end gap-[var(--small-gap)]">
          <CancelButton
            text="Hủy"
            width="w-auto"
            onClick={() => navigate("/login")}
          />
          <Button type="submit" text="Tìm kiếm" width="w-auto" />
        </div>
      </Box>
    </div>
  );
}

export default ForgotPassword;
