import HeaderUser from "../../shared/components/ui/HeaderUser";
import { ROUTES } from "../../shared/paths";
import { Link } from "react-router-dom";
import CartProgressBar from "../pagecontents/CartProgressBar";
import CartItemsBar from "../pagecontents/CartItemsBar";
import { useState } from "react";
import { useGet } from "../../service/crudService";

export default function ShoppingCart() {
  const { data: CartItemsInfos } = useGet(
    "http://localhost:8020/api/v1/gmshop/cart/user"
  );

  const [cartItemsChecked, setCartItemsChecked] = useState<any[]>([]);

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
          <CartProgressBar currentStep="cart" />
          <div className="overflow-y-auto overflow-x-hidden w-full h-[500px] flex flex-col gap-[var(--small-gap)]">
            {CartItemsInfos.map((CartItemsInfos: any, index: number) => (
              <CartItemsBar index={index + 1} CartItemsInfos={CartItemsInfos} />
            ))}
          </div>

          {/* Thông tin thanh toán */}
          <div></div>
        </div>
      </div>
    </div>
  );
}
