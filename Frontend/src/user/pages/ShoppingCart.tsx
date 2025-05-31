import HeaderUser from "../../shared/components/ui/HeaderUser";
import { ROUTES } from "../../shared/paths";
import { Link } from "react-router-dom";
import CartProgressBar from "../pagecontents/CartProgressBar";
import sample from "../../assets/avatar/sample.jpg";
import CheckBox from "../pagecontents/CheckBox";
import { useState } from "react";
export default function ShoppingCart() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
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
          <div className="flex justify-start p-[var(--medium-gap)] w-full gap-[var(--small-gap)]">
            <div className="body-text">1.</div>
            <div className="flex flex-col items-center ">
              <div className="w-[100px] aspect-square rounded-md overflow-hidden ">
                <img
                  src={sample}
                  alt="product image"
                  className="object-cover w-full h-full"
                />
              </div>
              <div>Xoá</div>
            </div>
            <div className="body-text">Tên sản phẩm</div>
          </div>
        </div>
      </div>
    </div>
  );
}
