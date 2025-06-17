import { Box, Line } from "../shared/components/ui";
import { Button } from "../shared/components/button";
import {
  RadioButton,
  InputField,
  DateOfBirthPicker,
} from "../shared/components/form";
import { handleCreateAccount } from "../service/authService";
import { ROUTES } from "../shared/paths";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function CreateAccount() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Nam");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Box
        width="400px"
        height="auto"
        className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
      >
        <div className="heading3 font-semibold text-center">
          Tạo tài khoản mới
        </div>

        {/*  */}
        <Line width="w-full" />
        <form
          className="flex flex-col gap-[var(--medium-gap)]"
          onSubmit={(e) =>
            handleCreateAccount(
              e,
              fullName,
              dateOfBirth,
              phoneNumber,
              email,
              password,
              address,
              setIsError,
              setError,
              navigate
            )
          }
        >
          <InputField
            value={fullName}
            onChange={(e: any) => setFullName(e.target.value)}
            placeholder="Họ và tên"
            type="text"
          />
          {/*  */}
          <div className="flex flex-col gap-[var(--small-gap)]">
            <div className="caption">Ngày sinh:</div>

            <DateOfBirthPicker setDateOfBirth={setDateOfBirth} width="w-full" />
          </div>
          <div className="flex flex-col gap-[var(--small-gap)]">
            <div className="caption">Giới tính:</div>
            <div className="flex gap-[var(--small-gap)] w-1/2">
              <RadioButton
                value="Nam"
                checked={gender === "Nam"}
                width="w-1/2"
                name="gender"
                text="Nam"
                onChange={(e: any) => setGender(e.target.value)}
              />
              <RadioButton
                value="Nữ"
                checked={gender === "Nữ"}
                width="w-1/2"
                name="gender"
                text="Nữ"
                onChange={(e: any) => setGender(e.target.value)}
              />
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col gap-[var(--small-gap)]">
            <InputField
              value={phoneNumber}
              onChange={(e: any) => setPhoneNumber(e.target.value)}
              placeholder="Số điện thoại"
              type="text"
            />
            <InputField
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              placeholder="Email"
              type="text"
            />
            <InputField
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="Mật khẩu mới"
              type="password"
            />
            <InputField
              value={address}
              onChange={(e: any) => setAddress(e.target.value)}
              placeholder="Địa chỉ"
              type="text"
            />
          </div>
          {isError && <p className="caption text-red-400 px-2">{error}</p>}
          {/*  */}
          <Line width="w-full" />
          <div className="flex flex-col items-center gap-[var(--medium-gap)]">
            <Button text="Đăng kí" type="submit" width="w-auto" />
            <Link
              className=" text-[var(--link-text)] hover:underline"
              to={ROUTES.AUTH.LOGIN}
            >
              Bạn đã có tài khoản?
            </Link>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default CreateAccount;
