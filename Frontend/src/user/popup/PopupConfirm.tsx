import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/paths";
import { Button, CancelButton } from "../../shared/components/button";

interface PopupConfirmProps {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupConfirm = ({ setShowPopup }: PopupConfirmProps) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-49">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        <div className="font-bold text-center ">
          Bạn cần đăng nhập để sử dụng chức năng này
        </div>
        <div className="flex justify-center w-full gap-[var(--small-gap)]">
          <Button
            type="button"
            text="Đăng nhập"
            onClick={() => navigate(ROUTES.AUTH.LOGIN)}
          />
          <Button
            type="button"
            text="Đăng ký"
            onClick={() => navigate(ROUTES.AUTH.CREATE_ACCOUNT)}
          ></Button>
          <CancelButton text="Đóng" onClick={() => setShowPopup(false)} />
        </div>
      </div>
    </div>
  );
};

export default PopupConfirm;
