import { LabeledInputField } from "../form/LabeledInputField";
import { handleCreate, handleCancelCreate } from "../../../service/crudService";
import { Button, CancelButton } from "../../components/button";

import { useState } from "react";

interface PopupProductProps {
  setAccounts: React.Dispatch<React.SetStateAction<any>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupAccount = ({ setAccounts, setShowPopup }: PopupProductProps) => {
  const [newAccountInfo, setNewAccountInfo] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
    state: "",
    role: "",
    address: "",
    email: "",
  });

  const [newAccount, setNewAccount] = useState<any>({});

  return (
    <div className="fixed z-49 inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="flex flex-col gap-[var(--medium-gap)]">
            <div>Thông tin tài khoảng:</div>

            {/* Username */}
            <LabeledInputField
              value={newAccountInfo.name}
              onChange={(e: any) =>
                setNewAccountInfo({
                  ...newAccountInfo,
                  name: e.target.value,
                })
              }
              label="Username: "
              placeholder="nguyenvana123"
              width="w-[240px]"
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
              width="w-[240px]"
            />

            {/* Họ và tên */}
            <LabeledInputField
              value={newAccountInfo.name}
              onChange={(e: any) =>
                setNewAccountInfo({
                  ...newAccountInfo,
                  name: e.target.value,
                })
              }
              label="Họ và tên: "
              placeholder="Nguyễn Văn A"
              width="w-[240px]"
            />

            {/* Số điện thoại */}
            <LabeledInputField
              value={newAccountInfo.phone}
              onChange={(e: any) =>
                setNewAccountInfo({
                  ...newAccountInfo,
                  phone: e.target.value,
                })
              }
              label="Số điện thoại: "
              placeholder="0123456789"
              width="w-[240px]"
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
              width="w-[240px]"
            />

            {/* Role */}
            <LabeledInputField
              value={newAccountInfo.role}
              onChange={(e: any) =>
                setNewAccountInfo({
                  ...newAccountInfo,
                  role: e.target.value,
                })
              }
              label="Role: "
              placeholder="Manager/ Employee/ User"
              width="w-[240px]"
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
              width="w-[240px]"
            />
          </div>

          <div className="flex flex-col gap-[var(--medium-gap)]">
            <div className="flex gap-[var(--small-gap)]">
              <Button
                onClick={() =>
                  handleCreate(
                    "http://localhost:8080/account/create",
                    newAccount,
                    setAccounts,
                    setNewAccount
                  )
                }
                type="submit"
                text="Lưu"
              />
              <CancelButton
                onClick={() => handleCancelCreate(setShowPopup, setNewAccount)}
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
