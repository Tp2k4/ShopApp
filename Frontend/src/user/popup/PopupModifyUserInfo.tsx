import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/paths";
import { Button, CancelButton } from "../../shared/components/button";

interface PopupModifyUserInfoProps {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupModifyUserInfo = ({ setShowPopup }: PopupModifyUserInfoProps) => {
  // Lấy token để thực hiện chức năng chỉnh sửa thông tin người dùng
  const token = localStorage.getItem("token");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-49">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div>Thông tin tài khoản:</div>

          <div className="flex gap-[var(--small-gap)]">
            <Button type="button" text="Lưu" />
            <CancelButton text="Hủy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModifyUserInfo;
