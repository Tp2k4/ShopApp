import { LabeledInputField } from "../form/LabeledInputField";
import { handleCreate, handleCancelCreate } from "../../../service/crudService";
import { Button, CancelButton } from "../../components/button";

import { useState } from "react";

interface PopupProductProps {
  setInventorys: React.Dispatch<React.SetStateAction<any>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupInventory = ({ setInventorys, setShowPopup }: PopupProductProps) => {
  const [newInventoryInfo, setNewInventoryInfo] = useState({
    product: "",
    inputOrOutput: "",
    amount: "",
  });

  const [newInventory, setNewInventory] = useState<any>({});

  return (
    <div className="fixed z-49 inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="flex flex-col gap-[var(--medium-gap)]">
            <div>Thông tin:</div>

            {/* Sản phẩm */}
            <LabeledInputField
              value={newInventoryInfo.product}
              onChange={(e: any) =>
                setNewInventoryInfo({
                  ...newInventoryInfo,
                  product: e.target.value,
                })
              }
              label="Sản phẩm: "
              placeholder="Tai nghe Logitech"
              width="w-[240px]"
            />

            {/* Nhập/ Xuất */}
            <LabeledInputField
              value={newInventoryInfo.product}
              onChange={(e: any) =>
                setNewInventoryInfo({
                  ...newInventoryInfo,
                  product: e.target.value,
                })
              }
              label="Nhập/ Xuất: "
              placeholder="Nhập/ Xuất"
              width="w-[240px]"
            />

            {/* Số lượng */}
            <LabeledInputField
              value={newInventoryInfo.amount}
              onChange={(e: any) =>
                setNewInventoryInfo({
                  ...newInventoryInfo,
                  amount: e.target.value,
                })
              }
              label="Số lượng: "
              placeholder="10"
              width="w-[240px]"
            />
          </div>

          <div className="flex flex-col gap-[var(--medium-gap)]">
            <div className="flex gap-[var(--small-gap)]">
              <Button
                onClick={() =>
                  handleCreate(
                    "http://localhost:8080/inventory/create",
                    newInventory,
                    setInventorys,
                    setNewInventory
                  )
                }
                type="submit"
                text="Lưu"
              />
              <CancelButton
                onClick={() =>
                  handleCancelCreate(setShowPopup, setNewInventory)
                }
                text="Hủy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupInventory;
