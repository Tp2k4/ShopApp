import Box from "../shared/components/ui/Box";
import Line from "../shared/components/ui/Line";
import Button from "../shared/components/button/Button";
import CancelButton from "../shared/components/button/CancelButton";
import InputField from "../shared/components/form/InputField";
import Avatar from "../shared/components/ui/Avatar";
import avatar from "../assets/avatar/avatar.jpg";

import { useNavigate } from "react-router-dom";

function SendAuthCode() {
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
          <div className="w-full flex items-center gap-[var(--small-gap)]">
            <InputField className="w-1/2" type="text" placeholder="Nhập mã" />
            <div className="w-1/2">
              Chúng tôi đã gửi mã cho bạn đến:{" "}
              <span className="text-blue-500">0123456789</span>
            </div>
          </div>

          <Button type="submit" text="Gửi lại" width="w-auto" />
        </div>

        {/* Avatar */}
        <div className="w-full flex flex-col items-center gap-[var(--small-gap)]">
          <Avatar src={avatar} />
          <div className="heading3">Lê Võ</div>
        </div>

        {/*  */}
        <Line width="w-full" />
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

export default SendAuthCode;
