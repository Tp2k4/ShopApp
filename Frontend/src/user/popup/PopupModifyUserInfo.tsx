import { Button, CancelButton } from "../../shared/components/button";
import { handleModifyUserInfo } from "../../service/crudService";
import { LabeledInputField } from "../../shared/components/form";

interface PopupModifyUserInfoProps {
  userId: number;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  updatedUserInfo: any;
  setUpdatedUserInfo: React.Dispatch<React.SetStateAction<any>>;
}

const PopupModifyUserInfo = ({
  userId,
  setShowPopup,
  updatedUserInfo,
  setUpdatedUserInfo,
}: PopupModifyUserInfoProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-49">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div>Thông tin tài khoản:</div>

          {/* Họ và tên */}
          <LabeledInputField
            value={updatedUserInfo.fullname || ""}
            onChange={(e: any) =>
              setUpdatedUserInfo({
                ...updatedUserInfo,
                fullname: e.target.value,
              })
            }
            label="Họ và tên: "
            placeholder="Nguyễn Văn A"
            inputFieldWidth="w-[240px]"
          />

          {/* Số điện thoại */}
          <LabeledInputField
            value={updatedUserInfo.phone_number || ""}
            onChange={(e: any) =>
              setUpdatedUserInfo({
                ...updatedUserInfo,
                phone_number: e.target.value,
              })
            }
            label="Số điện thoại: "
            placeholder="0123456789"
            inputFieldWidth="w-[240px]"
          />

          {/* Email */}
          <LabeledInputField
            value={updatedUserInfo.email || ""}
            onChange={(e: any) =>
              setUpdatedUserInfo({
                ...updatedUserInfo,
                email: e.target.value,
              })
            }
            label="Email: "
            placeholder="nguyenvana@example.com"
            inputFieldWidth="w-[240px]"
          />

          {/* Địa chỉ */}
          <LabeledInputField
            value={updatedUserInfo.address || ""}
            onChange={(e: any) =>
              setUpdatedUserInfo({
                ...updatedUserInfo,
                address: e.target.value,
              })
            }
            label="Địa chỉ: "
            placeholder="123 đường nguyen van"
            inputFieldWidth="w-[240px]"
          />

          {/* Ngày sinh */}
          <LabeledInputField
            value={updatedUserInfo.date_of_birth || ""}
            onChange={(e: any) =>
              setUpdatedUserInfo({
                ...updatedUserInfo,
                date_of_birth: e.target.value,
              })
            }
            label="Ngày sinh: "
            placeholder="2024/01/01"
            inputFieldWidth="w-[240px]"
          />

          <div className="flex gap-[var(--small-gap)]">
            <Button
              onClick={() =>
                handleModifyUserInfo(
                  "http://localhost:8020/api/v1/gmshop/user/update/",
                  userId,
                  updatedUserInfo,
                  setUpdatedUserInfo,
                  setShowPopup
                )
              }
              type="button"
              text="Lưu"
            />
            <CancelButton onClick={() => setShowPopup(false)} text="Hủy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModifyUserInfo;
