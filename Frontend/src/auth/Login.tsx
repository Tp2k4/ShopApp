import { Box, Line } from "../shared/components/ui";
import { Button } from "../shared/components/button";
import { InputField } from "../shared/components/form";
import { handleLogin } from "../service/authService";
import { ROUTES } from "../shared/paths";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

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
              onSubmit={(event) =>
                handleLogin(event, username, password, setIsError, setError)
              }
            >
              <div className="w-full flex flex-col gap-[var(--small-gap)]">
                <InputField
                  value={username}
                  onChange={(event: any) => setUsername(event.target.value)}
                  width="w-full"
                  placeholder="username"
                  type="text"
                />
                <InputField
                  value={password}
                  onChange={(event: any) => setPassword(event.target.value)}
                  width="w-full"
                  placeholder="password"
                  type="password"
                />
                {isError && (
                  <p className="caption text-red-500 px-2">{error}</p>
                )}
              </div>

              <Button type="submit" width="w-full" text="Đăng nhập" />
            </form>

            {/*  */}
            <Link
              className="text-[var(--link-text)] hover:underline"
              to={ROUTES.AUTH.FORGOT_PASSWORD}
            >
              Quên mật khẩu?
            </Link>
            <Line width="w-full" />
            <Button
              onClick={() => navigate(ROUTES.AUTH.CREATE_ACCOUNT)}
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