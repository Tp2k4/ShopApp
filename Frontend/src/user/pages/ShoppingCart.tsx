import HeaderUser from "../../shared/components/ui/HeaderUser";
import { ROUTES } from "../../shared/paths";
import { Link } from "react-router-dom";
import CartProgressBar from "../pagecontents/CartProgressBar";
import CartItemsBar from "../pagecontents/CartItemsBar";
import { useEffect, useState } from "react";
import { useGet } from "../../service/crudService";

export default function ShoppingCart() {
  const { data: CartItemsInfos } = useGet(
    "http://localhost:8020/api/v1/gmshop/cart/user"
  );

  // Theo dõi các sản phẩm trong giỏ hàng đã được chọn để hiển thị giá tổng tiền với truyền sang trang payment
  const [listCartItemsChecked, setListCartItemsChecked] = useState<any[]>([]);

  // Tính tổng tiền hàng từ các sản phẩm đã chọn
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (listCartItemsChecked.length === 0) {
      setTotalPrice(0);
      return;
    }

    setTotalPrice(
      listCartItemsChecked.reduce(
        (total, item) => total + item.sellPrice * item.quantity,
        0
      )
    );
    console.log(listCartItemsChecked);
  }, [listCartItemsChecked]);

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
            {CartItemsInfos.map((CartItemInfos: any, index: number) => (
              <CartItemsBar
                setListCartItemsChecked={setListCartItemsChecked}
                index={index + 1}
                CartItemInfos={CartItemInfos}
              />
            ))}
          </div>

          {/* Thông tin thanh toán */}
          <div className="flex justify-between w-full">
            <div className="flex">
              <div>Phương thức thanh toán:</div>
              <div> Thanh toán khi nhận hàng</div>
            </div>
            <div className="flex flex-col items-end">
              <div>
                Tổng số tiền hàng: {totalPrice.toLocaleString("vi-VN")}đ
              </div>
              <div>
                Phí vận chuyển: <span>20.000đ</span>
              </div>
              <div>
                Tổng thanh toán: {(totalPrice + 20000).toLocaleString("vi-VN")}đ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
