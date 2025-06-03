import HeaderUser from "../../shared/components/ui/HeaderUser";
import { ROUTES } from "../../shared/paths";
import { Link } from "react-router-dom";
import CartProgressBar from "../pagecontents/CartProgressBar";

import { useGet } from "../../service/crudService";

export default function Payment() {
  const { data: CartItemsInfos } = useGet(
    "http://localhost:8020/api/v1/gmshop/cart/user"
  );
  const rawAccount = localStorage.getItem("userAccount");
  const account = rawAccount ? JSON.parse(rawAccount) : null;
  return (
    <div className="h-screen w-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <HeaderUser />
      <div className="w-[var(--max-width-content)] h-full flex flex-col items-start justify-center gap-[var(--medium-gap)] ">
        <Link
          to={ROUTES.USER.HOME}
          className="text-[var(--primary-hover))] body-text hover:text-[var(--primary-color)]"
        >
          &lt; Mua thêm sản phẩm khác
        </Link>
        <div className="flex flex-col items-center justify-start w-full h-full gap-[var(--medium-gap)] p-[var(--small-gap)] bg-white rounded-sm">
          <CartProgressBar currentStep="payment" />
        </div>
        <div></div>
      </div>
    </div>
  );
}
