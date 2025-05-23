import { LabeledInputField } from "../../../shared/components/form";
import { handleModify, handleCancelModify } from "../../../service/crudService";
import { Button, CancelButton } from "../../../shared/components/button";

import { useState, useEffect } from "react";

interface AccountProps {
  account: any;
  setAccounts: React.Dispatch<React.SetStateAction<any>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupAccountModify = ({
  account,
  setAccounts,
  setShowPopup,
}: AccountProps) => {
  // set role từ admin/ user/ employee sang số 1/ 2/ 3
  const roleDict: Record<string, number> = {
    admin: 1,
    user: 2,
    employee: 3,
  };

  const isActiveDict: Record<string, number> = {
    "Hoạt động": 1,
    Khóa: 0,
  };

  const [accountInfo, setAccountInfo] = useState({
    fullname: "",
    date_of_birth: "",
    phone_number: "",
    email: "",
    address: "",
    is_active: 1,
    role_id: 2,
    facebook_account_id: "",
    google_account_id: "",
  });

  useEffect(() => {
    if (!account) return;

    setAccountInfo({
      fullname: account.name,
      date_of_birth: account.dateOfBirth,
      //gender
      phone_number: account.phoneNumber,
      email: account.email,
      address: account.address,
      is_active: isActiveDict[account.state],
      role_id: roleDict[account.role],
      facebook_account_id: account.facebook_account_id,
      google_account_id: account.google_account_id,
    });
  }, [account]);

  return (
    <div className="fixed z-49 inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="flex flex-col gap-[var(--medium-gap)]">
            <div>Thông tin tài khoản:</div>

            {/* Họ và tên */}
            <LabeledInputField
              value={accountInfo.fullname || ""}
              onChange={(e: any) =>
                setAccountInfo({
                  ...accountInfo,
                  fullname: e.target.value,
                })
              }
              label="Họ và tên: "
              placeholder="Nguyễn Văn A"
              inputFieldWidth="w-[240px]"
            />

            {/* Ngày sinh */}
            <LabeledInputField
              value={accountInfo.date_of_birth || ""}
              onChange={(e: any) =>
                setAccountInfo({
                  ...accountInfo,
                  date_of_birth: e.target.value,
                })
              }
              label="Ngày sinh: "
              placeholder="2024/01/01"
              inputFieldWidth="w-[240px]"
            />

            {/* Số điện thoại */}
            <LabeledInputField
              value={accountInfo.phone_number || ""}
              onChange={(e: any) =>
                setAccountInfo({
                  ...accountInfo,
                  phone_number: e.target.value,
                })
              }
              label="Số điện thoại: "
              placeholder="0123456789"
              inputFieldWidth="w-[240px]"
            />

            {/* Email */}
            <LabeledInputField
              value={accountInfo.email || ""}
              onChange={(e: any) =>
                setAccountInfo({
                  ...accountInfo,
                  email: e.target.value,
                })
              }
              label="Email: "
              placeholder="nguyenvana@example.com"
              inputFieldWidth="w-[240px]"
            />

            {/* Role */}
            <LabeledInputField
              value={String(accountInfo.role_id) || ""}
              onChange={(e: any) =>
                setAccountInfo({
                  ...accountInfo,
                  role_id: parseInt(e.target.value, 10),
                })
              }
              label="Role: "
              placeholder="1: Manager/ 3: Employee/ 2: User"
              inputFieldWidth="w-[240px]"
            />

            {/* Trạng thái */}
            <LabeledInputField
              value={String(accountInfo.is_active) || ""}
              onChange={(e: any) =>
                setAccountInfo({
                  ...accountInfo,
                  is_active: parseInt(e.target.value, 10),
                })
              }
              label="Trạng thái: "
              placeholder="1: Manager/ 3: Employee/ 2: User"
              inputFieldWidth="w-[240px]"
            />

            {/* Địa chỉ */}
            <LabeledInputField
              value={accountInfo.address || ""}
              onChange={(e: any) =>
                setAccountInfo({
                  ...accountInfo,
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
                onClick={() => {
                  handleModify(
                    "http://localhost:8020/api/v1/gmshop/user/update/",
                    account.id,
                    accountInfo,
                    setAccountInfo,
                    setAccounts
                  );
                  setShowPopup(false);
                }}
                type="button"
                text="Lưu"
              />
              <CancelButton
                onClick={() =>
                  handleCancelModify(setShowPopup, setAccountInfo, account)
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

export default PopupAccountModify;
