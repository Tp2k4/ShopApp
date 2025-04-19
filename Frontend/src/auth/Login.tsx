import Box from "../shared/components/ui/Box";
import Line from "../shared/components/ui/Line";
import Button from "../shared/components/button/Button";
import InputField from "../shared/components/form/InputField";

import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex w-[800px] gap-[var(--big-gap)]">
        {/*  */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="logo text-[var(--primary-color)]">GAMING GEAR</div>
          <div className="heading2">
            Giúp bạn mua sắm thỏa thích chuột, bàn phím, tai nghe, … với giá rẻ
          </div>
        </div>

        {/*  */}
        <div className="flex-1 flex justify-center">
          <Box
            className="flex flex-col items-center gap-[var(--medium-gap)] p-[var(--medium-gap)]"
            width="350px"
            height="auto"
          >
            <form
              className="w-full flex flex-col gap-[var(--medium-gap)]"
              method="POST"
            >
              <div className="w-full flex flex-col gap-[var(--small-gap)]">
                <InputField width="w-full" placeholder="username" type="text" />
                <InputField
                  width="w-full"
                  placeholder="password"
                  type="password"
                />
              </div>

              <Button type="submit" width="w-full" text="Đăng nhập" />
            </form>

            {/*  */}
            <Link
              className="text-[var(--link-text)] hover:underline"
              to="/forgot-password"
            >
              Quên mật khẩu?
            </Link>
            <Line width="w-full" />
            <Button
              onClick={() => navigate("/create-account")}
              type="button"
              width="w-auto"
              text="Tạo tài khoản mới"
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Login;

