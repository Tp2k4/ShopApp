import { LabeledInputField } from "../form";
import { handleCreate, handleCancelCreate } from "../../../service/crudService";
import { Button, CancelButton } from "../../components/button";

import { useState } from "react";

interface PopupProductProps {
  setOrders: React.Dispatch<React.SetStateAction<any>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupOrder = ({ setOrders, setShowPopup }: PopupProductProps) => {
  const [newOrderInfo, setNewProductInfo] = useState({
    customerName: "",
    phone: "",
    email: "",
    date: "",
    totalPrice: "",
    address: "",
    products: "",
  });

  const [newOrder, setNewOrder] = useState<any>({});

  return (
    <div className="fixed z-49 inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        {/* Info */}
        <div className="flex">
          {/* Left */}
          <div className="pr-[var(--medium-gap)] flex flex-col gap-[var(--medium-gap)]">
            <div>Thông tin đơn hàng:</div>

            {/* Tên khách */}
            <LabeledInputField
              value={newOrderInfo.customerName}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newOrderInfo,
                  customerName: e.target.value,
                })
              }
              label="Tên khách: "
              placeholder="Nguyễn Văn A"
              width="w-[240px]"
            />

            {/* Số điện thoại */}
            <LabeledInputField
              value={newOrderInfo.phone}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newOrderInfo,
                  phone: e.target.value,
                })
              }
              label="Số điện thoại: "
              placeholder="0123456789"
              width="w-[240px]"
            />

            {/* Email */}
            <LabeledInputField
              value={newOrderInfo.email}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newOrderInfo,
                  email: e.target.value,
                })
              }
              label="Email: "
              placeholder="nguyenvana@example.com"
              width="w-[240px]"
            />

            {/* Ngày */}
            <LabeledInputField
              value={newOrderInfo.date}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newOrderInfo,
                  date: e.target.value,
                })
              }
              label="Ngày: "
              placeholder="01/01/2025"
              width="w-[240px]"
            />

            {/* Địa chỉ */}
            <LabeledInputField
              value={newOrderInfo.address}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newOrderInfo,
                  address: e.target.value,
                })
              }
              label="Địa chỉ: "
              placeholder="123 đường Nguyễn Văn A"
              width="w-[240px]"
            />

            <div className="flex gap-[var(--small-gap)]">
              <Button
                onClick={() =>
                  handleCreate(
                    "http://localhost:8080/order/create",
                    newOrder,
                    setOrders,
                    setNewOrder
                  )
                }
                type="submit"
                text="Lưu"
              />
              <CancelButton
                onClick={() => handleCancelCreate(setShowPopup, setNewOrder)}
                text="Hủy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupOrder;
