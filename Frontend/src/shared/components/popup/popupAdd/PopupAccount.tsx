import { LabeledInputField } from "../../form";
import {
  handleCreateAccount,
  handleCancelCreate,
} from "../../../../service/crudService";
import { Button, CancelButton } from "../../../components/button";

import { useState } from "react";

interface AccountProps {
  setAccounts: React.Dispatch<React.SetStateAction<any>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupAccount = ({ setAccounts, setShowPopup }: AccountProps) => {
  const [newAccountInfo, setNewAccountInfo] = useState({
    fullname: "",
    password: "",
    date_of_birth: "",
    // gender,
    phone_number: "",
    email: "",
    address: "",
    is_active: 1,
    role_id: 2,
    facebook_account_id: 0,
    google_account_id: 0,
  });

  return (
    <div className="fixed z-49 inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="flex flex-col gap-[var(--medium-gap)]">
            <div>Thông tin tài khoản:</div>

            {/* Họ và tên */}
            <LabeledInputField
              value={newAccountInfo.fullname}
              onChange={(e: any) =>
                setNewAccountInfo({
                  ...newAccountInfo,
                  fullname: e.target.value,
                })
              }
              label="Họ và tên: "
              placeholder="Nguyễn Văn A"
              inputFieldWidth="w-[240px]"
            />

            {/* Mật khẩu */}
            <LabeledInputField
              value={newAccountInfo.password}
              onChange={(e: any) =>
                setNewAccountInfo({
                  ...newAccountInfo,
                  password: e.target.value,
                })
              }
              label="Mật khẩu: "
              placeholder="..."
              inputFieldWidth="w-[240px]"
            />

            {/* Ngày sinh */}
            <LabeledInputField
              value={newAccountInfo.date_of_birth}
              onChange={(e: any) =>
                setNewAccountInfo({
                  ...newAccountInfo,
                  date_of_birth: e.target.value,
                })
              }
              label="Ngày sinh: "
              placeholder="2024/01/01"
              inputFieldWidth="w-[240px]"
            />

            {/* Số điện thoại */}
            <LabeledInputField
              value={newAccountInfo.phone_number}
              onChange={(e: any) =>
                setNewAccountInfo({
                  ...newAccountInfo,
                  phone_number: e.target.value,
                })
              }
              label="Số điện thoại: "
              placeholder="0123456789"
              inputFieldWidth="w-[240px]"
            />

            {/* Email */}
            <LabeledInputField
              value={newAccountInfo.email}
              onChange={(e: any) =>
                setNewAccountInfo({
                  ...newAccountInfo,
                  email: e.target.value,
                })
              }
              label="Email: "
              placeholder="nguyenvana@example.com"
              inputFieldWidth="w-[240px]"
            />

            {/* Role */}
            <LabeledInputField
              value={String(newAccountInfo.role_id)}
              onChange={(e: any) =>
                setNewAccountInfo({
                  ...newAccountInfo,
                  role_id: parseInt(e.target.value, 10),
                })
              }
              label="Role: "
              placeholder="1: Manager/ 3: Employee/ 2: User"
              inputFieldWidth="w-[240px]"
            />

            {/* Địa chỉ */}
            <LabeledInputField
              value={newAccountInfo.address}
              onChange={(e: any) =>
                setNewAccountInfo({
                  ...newAccountInfo,
                  address: e.target.value,
                })
              }
              label="Địa chỉ: "
              placeholder="123 đường nguyen van"
              inputFieldWidth="w-[240px]"
            />
          </div>

          <div className="flex flex-col gap-[var(--medium-gap)]">
            <div className="flex gap-[var(--small-gap)]">
              <Button
                onClick={() =>
                  handleCreateAccount(
                    "http://localhost:8020/api/v1/gmshop/user/register",
                    newAccountInfo,
                    setNewAccountInfo,
                    setAccounts
                  )
                }
                type="submit"
                text="Lưu"
              />
              <CancelButton
                onClick={() =>
                  handleCancelCreate(setShowPopup, setNewAccountInfo)
                }
                text="Hủy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupAccount;
