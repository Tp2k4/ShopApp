import HeaderUserNoSearch from "../../shared/components/ui/HeaderUserNoSearch";
import { ROUTES } from "../../shared/paths";
import { Link } from "react-router-dom";
import CartProgressBar from "../pagecontents/CartProgressBar";
import Line from "../../shared/components/ui/Line";
import { useGet } from "../../service/crudService";
import { Button } from "../../shared/components/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_TEST_API } from "../../shared/paths";
import Footer from "../../shared/components/ui/Footer";
export default function Payment() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const { data: UserInfos } = useGet(`${BASE_TEST_API}user/get-user`);

  const listCartItemsChecked = JSON.parse(
    localStorage.getItem("listCartItemsChecked") || "[]"
  );

  // Tính tổng số tiền hàng
  const totalPrice = listCartItemsChecked.reduce(
    (total: number, item: any) =>
      total + (Number(item.sellPrice) || 0) * (Number(item.quantity) || 0),
    0
  );

  interface cart_items {
    quantity: number;
    cart_item: number;
  }

  interface orderInfo {
    user_id: number;
    fullname: string;
    phone_number: string;
    address: string;
    note: string;
    total_money: number;
    payment_method: string;
    shipping_address: string;
    tracking_number: string;
    cart_items: cart_items[];
  }

  const [orderInfo, setOrderInfo] = useState<orderInfo>({
    user_id: UserInfos.id,
    fullname: UserInfos.name,
    phone_number: UserInfos.phoneNumber,
    address: UserInfos.address,
    note: "",
    total_money: 0, // Sẽ được tính sau
    payment_method: "COD", // Thanh toán khi nhận hàng
    shipping_address: UserInfos.address,
    tracking_number: "", // Sẽ được cập nhật sau
    cart_items: listCartItemsChecked.map((item: any) => ({
      quantity: item.quantity,
      cart_item: item.id,
    })),
  });

  useEffect(() => {
    setOrderInfo({
      user_id: UserInfos.id,
      fullname: UserInfos.name,
      phone_number: UserInfos.phoneNumber,
      address: UserInfos.address,
      note: "",
      total_money: totalPrice + 20000, // Sẽ được tính sau
      payment_method: "COD", // Thanh toán khi nhận hàng
      shipping_address: UserInfos.address,
      tracking_number: "", // Sẽ được cập nhật sau
      cart_items: listCartItemsChecked.map((item: any) => ({
        quantity: item.quantity,
        cart_item: item.id,
      })),
    });
  }, [UserInfos, totalPrice]);

  console.log("Order Info:", orderInfo);

  return (
    <div className="w-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <HeaderUserNoSearch />
      <div className="w-[var(--max-width-content)] h-full flex flex-col items-start justify-center gap-[var(--medium-gap)] ">
        <Link
          to={ROUTES.USER.HOME}
          className="text-[var(--primary-hover))] body-text hover:text-[var(--primary-color)]"
        >
          &lt; Mua thêm sản phẩm khác
        </Link>
        <div className="flex flex-col items-start justify-start w-full h-full gap-[var(--medium-gap)] p-[var(--medium-gap)] bg-white rounded-sm">
          <CartProgressBar currentStep="payment" />
          <div className="font-bold text-red-500 heading3">
            Thông tin người nhận
          </div>
          <div className="flex flex-col items-start justify-start w-full h-full gap-[var(--medium-gap)]">
            <div className="gap-[var(--small-gap)]">
              <div>
                <span className="font-bold">Tên:</span> {UserInfos.name}
              </div>
              <div>
                <span className="font-bold">Sđt:</span> {UserInfos.phoneNumber}
              </div>
              <div>
                <span className="font-bold">Địa chỉ:</span> {UserInfos.address}
              </div>
            </div>

            {/* Danh sách các sản phẩm */}
            <div className="flex items-center justify-between w-full opacity-[var(--caption-opacity)]">
              <div>Sản phẩm</div>
              <div className="flex items-center justify-between w-1/3">
                <div className="w-[70px] text-right">Đơn giá</div>
                <div>Số lượng</div>
                <div>Thành tiền</div>
              </div>
            </div>
            <Line width="w-full" />
            <div className="w-full h-[300px] overflow-y-auto overflow-x-hidden flex flex-col gap-[var(--small-gap)]">
              <div className="w-full gap-[var(--small-gap)] flex flex-col">
                {listCartItemsChecked.map((item: any, index: number) => (
                  <div className="flex flex-col" key={index}>
                    <div className="flex justify-between items-center gap-[var(--medium-gap)] w-full">
                      <div className="flex gap-[var(--small-gap)] items-center">
                        <div className="w-[100px] aspect-square rounded-md overflow-hidden">
                          <img
                            className="object-cover w-full h-full"
                            src={item.productImageUrl}
                            alt="product image"
                          ></img>
                        </div>
                        <div>{item.productName}</div>
                      </div>
                      <div className="flex justify-between w-1/3">
                        <div className="w-[70px] text-right">
                          {item.sellPrice.toLocaleString("vi-VN")}đ
                        </div>
                        <div>{item.quantity}</div>
                        <div>
                          {(item.sellPrice * item.quantity).toLocaleString(
                            "vi-VN"
                          )}
                          đ
                        </div>
                      </div>
                    </div>
                    <Line width="w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* phần thanh toán  */}
            <div className="flex justify-between w-full ">
              <div className="flex items-center gap-[var(--medium-gap)]">
                <div className="text-bold">Phương thức thanh toán:</div>
                <div className="rounded-md border border-[var(--primary-hover)] p-[var(--small-gap)] w-fit h-fit">
                  Thanh toán khi nhận hàng
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div>
                  Tổng số tiền hàng: {totalPrice.toLocaleString("vi-VN")}đ
                </div>
                <div>
                  Phí vận chuyển: <span>20.000đ</span>
                </div>
                <div>
                  Tổng thanh toán:{" "}
                  <span className="text-red-500 heading2">
                    {(totalPrice + 20000).toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <Button
                  type="button"
                  text="Đặt hàng"
                  onClick={() => {
                    fetch("https://gm-12tk.onrender.com/api/v1/gmshop/orders", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify(orderInfo),
                    });
                    localStorage.removeItem("listCartItemsChecked");
                    navigate(ROUTES.USER.FINISH_ORDER);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
