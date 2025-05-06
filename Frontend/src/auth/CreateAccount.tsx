import { Box, Line } from "../shared/components/ui";
import { Button } from "../shared/components/button";
import {
  RadioButton,
  InputField,
  DateOfBirthPicker,
} from "../shared/components/form";
import { ROUTES } from "../shared/paths";

import { Link } from "react-router-dom";

function CreateAccount() {
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
        <InputField placeholder="Họ và tên" type="text" />

        {/*  */}

        <div className="flex flex-col gap-[var(--small-gap)]">
          <div className="caption">Ngày sinh:</div>
          <DateOfBirthPicker width="w-full" />
        </div>
        <div className="flex flex-col gap-[var(--small-gap)]">
          <div className="caption">Giới tính:</div>
          <div className="flex gap-[var(--small-gap)] w-1/2">
            <RadioButton width="w-1/2" name="gender" text="Nam" />
            <RadioButton width="w-1/2" name="gender" text="Nữ" />
          </div>
        </div>

        {/*  */}
        <div className="flex flex-col gap-[var(--small-gap)]">
          <InputField placeholder="Số điện thoại hoặc email" type="text" />
          <InputField placeholder="Mật khẩu mới" type="text" />
          <InputField placeholder="Địa chỉ" type="text" />
        </div>

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
      </Box>
    </div>
  );
}

export default CreateAccount;
