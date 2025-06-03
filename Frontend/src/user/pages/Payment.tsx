import HeaderUser from "../../shared/components/ui/HeaderUser";
import { ROUTES } from "../../shared/paths";
import { Link } from "react-router-dom";
import CartProgressBar from "../pagecontents/CartProgressBar";

import { useGet } from "../../service/crudService";

export default function Payment() {
  const { data: UserInfos } = useGet(
    "http://localhost:8020/api/v1/gmshop/user/get-user"
  );

  const listCartItemsChecked = JSON.parse(
    localStorage.getItem("listCartItemsChecked") || "[]"
  );

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
        <div className="flex flex-col items-start justify-start w-full h-full gap-[var(--medium-gap)] p-[var(--medium-gap)] bg-white rounded-sm">
          <CartProgressBar currentStep="payment" />
          <div className="">Thông tin người nhận</div>
          <div className="flex flex-col items-start justify-start w-full h-full gap-[var(--smallest-gap)]">
            <div>
              <span className="font-bold">Tên:</span> {UserInfos.name}
            </div>
            <div>
              <span className="font-bold">Sđt:</span> {UserInfos.phoneNumber}
            </div>
            <div>
              <span className="font-bold">Địa chỉ:</span> {UserInfos.address}
            </div>

            {/* Danh sách các sản phẩm */}
            <div className="w-full h-full">
              {listCartItemsChecked.map((item: any, index: number) => (
                <div
                  className="w-[100px] aspect-square rounded-md overflow-hidden"
                  key={index}
                >
                  <img
                    className="object-cover w-full h-full"
                    src={`http://localhost:8020/images/${item.productImageUrl}`}
                    alt="product image"
                  ></img>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
