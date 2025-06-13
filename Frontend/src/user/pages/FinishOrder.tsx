import HeaderUserNoSearch from "../../shared/components/ui/HeaderUserNoSearch";
import CartProgressBar from "../pagecontents/CartProgressBar";
import { Button } from "../../shared/components/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/paths";
export default function FinishOrder() {
  const navigate = useNavigate();
  return (
    <div className="w-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <HeaderUserNoSearch />
      <div className="w-[var(--max-width-content)] h-full flex flex-col items-start justify-center gap-[var(--medium-gap)] ">
        <div className="flex flex-col items-center justify-center w-full gap-[var(--medium-gap)] p-[var(--medium-gap)] bg-white rounded-sm">
          <CartProgressBar currentStep="done" />
          <div className="heading3">
            Đơn hàng của bạn đã được đặt thành công!
          </div>
          <Button
            text="Quay về trang chủ"
            type="button"
            onClick={() => {
              navigate(ROUTES.USER.HOME);
            }}
          />
        </div>
      </div>
    </div>
  );
}
