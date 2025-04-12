import Box from "../shared/components/ui/Box";
import Line from "../shared/components/ui/Line";
import Button from "../shared/components/button/Button";
import RadioButton from "../shared/components/form/RadioButton";
import SelectButton from "../shared/components/button/SelectButton";
import InputField from "../shared/components/form/InputField";

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
        <Line width="100%" />
        <InputField placeholder="Họ và tên" type="text" />

        {/*  */}

        <div className="flex flex-col gap-[var(--small-gap)]">
          <div>Ngày sinh:</div>
          <div className="flex gap-[var(--small-gap)]">
            <SelectButton className="w-1/3" text="8" />
            <SelectButton className="w-1/3" text="8" />
            <SelectButton className="w-1/3" text="8" />
          </div>
        </div>
        <div className="flex flex-col gap-[var(--small-gap)]">
          <div>Giới tính:</div>
          <div className="flex gap-[var(--small-gap)] w-1/2">
            <RadioButton className="w-1/2" name="gender" text="Nam" />
            <RadioButton className="w-1/2" name="gender" text="Nữ" />
          </div>
        </div>

        {/*  */}
        <div className="flex flex-col gap-[var(--small-gap)]">
          <InputField placeholder="Số điện thoại hoặc email" type="text" />
          <InputField placeholder="Mật khẩu mới" type="text" />
          <InputField placeholder="Địa chỉ" type="text" />
        </div>

        {/*  */}
        <Line width="100%" />
        <div className="flex flex-col items-center gap-[var(--medium-gap)]">
          <Button text="Đăng kí" type="submit" width="100px" />
          <Link
            className=" text-[var(--link-text)] hover:underline"
            to="/login"
          >
            Bạn đã có tài khoản?
          </Link>
        </div>
      </Box>
    </div>
  );
}

export default CreateAccount;
