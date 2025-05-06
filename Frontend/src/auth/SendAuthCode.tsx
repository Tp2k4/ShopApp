import { Box, Line, Avatar } from "../shared/components/ui";
import { Button, CancelButton } from "../shared/components/button";
import { InputField } from "../shared/components/form";
import { sendOtp, verifyOtp } from "../service/authService/handleSendAuthCode";
import { ROUTES } from "../shared/paths";
import avatar from "../assets/avatar/avatar.jpg";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function SendAuthCode() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [authCode, setAuthCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      sendOtp(email);
    } else {
      setIsError(true);
      setError("Email không hợp lệ.");
    }
  }, [email]);

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
            className="flex flex-col gap-[var(--small-gap)]"
            // onSubmit={verifyOtp(email, authCode)}
          >
            <div className="w-full flex items-center gap-[var(--small-gap)]">
              <InputField
                value={authCode}
                onChange={(e: any) => setAuthCode(e.target.value)}
                className="w-1/2"
                type="text"
                placeholder="Nhập mã"
              />

              <div className="w-1/2">
                Chúng tôi đã gửi mã cho bạn đến:{" "}
                <span className="text-blue-500">levo2k4@gmail.com</span>
              </div>
              {isError && <p className="caption text-red-500 px-2">{error}</p>}
            </div>
            <div>
              <Button type="submit" text="Gửi lại" width="w-auto" />
            </div>
          </form>
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
            onClick={() => navigate(ROUTES.AUTH.LOGIN)}
          />
          <Button type="submit" text="Tìm kiếm" width="w-auto" />
        </div>
      </Box>
    </div>
  );
}

export default SendAuthCode;
