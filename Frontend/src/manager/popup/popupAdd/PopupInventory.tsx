import {
  LabeledInputField,
  SelectButton,
} from "../../../shared/components/form";
import {
  handleCreate,
  handleCancelCreate,
  useGet,
} from "../../../service/crudService";

import { Button, CancelButton } from "../../../shared/components/button";

import { useState, useEffect } from "react";

interface PopupProductProps {
  setInventorys: React.Dispatch<React.SetStateAction<any>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupInventory = ({ setInventorys, setShowPopup }: PopupProductProps) => {
  // Thông tin sản phẩm mới
  const [newInventoryInfo, setNewInventoryInfo] = useState({
    productName: "",
    transactionType: "",
    quantity: 0,
  });

  // Gọi API để lấy danh sách sản phẩm
  const { data: productList } = useGet(
    "https://gm-12tk.onrender.com/api/v1/gmshop/product/admin/product-name-list"
  );
  // Lấy danh sách "tên" sản phẩm từ API
  const [productListName, setProductListName] = useState<String[]>([]);
  useEffect(() => {
    if (productList.length > 0) {
      const names = productList.map((product: any) => product.productName);
      setProductListName(names);
    }
  }, [productList]);

  return (
    <div className="fixed z-49 inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="flex flex-col gap-[var(--medium-gap)]">
            <div>Thông tin:</div>

            {/* Sản phẩm */}

            <div className="flex items-center">
              <div className="w-[180px]">
                <strong>Sản phẩm: </strong>
              </div>
              <SelectButton
                value={newInventoryInfo.productName}
                onChange={(e: any) => {
                  setNewInventoryInfo({
                    ...newInventoryInfo,
                    productName: e.target.value,
                  });
                }}
                width="w-[240px]"
                dataset={productListName}
              />
            </div>
            {/* Nhập/ Xuất */}
            <LabeledInputField
              value={newInventoryInfo.transactionType}
              onChange={(e: any) =>
                setNewInventoryInfo({
                  ...newInventoryInfo,
                  transactionType: e.target.value,
                })
              }
              label="Nhập/ Xuất: "
              placeholder="import/ export"
              inputFieldWidth="w-[240px]"
            />

            {/* Số lượng */}
            <LabeledInputField
              value={
                newInventoryInfo.quantity === 0
                  ? ""
                  : String(newInventoryInfo.quantity)
              }
              onChange={(e: any) => {
                const value = e.target.value;
                setNewInventoryInfo({
                  ...newInventoryInfo,
                  quantity: value === "" ? 0 : parseInt(value),
                });
              }}
              label="Số lượng: "
              placeholder="10"
              inputFieldWidth="w-[240px]"
            />
          </div>

          <div className="flex flex-col gap-[var(--medium-gap)]">
            <div className="flex gap-[var(--small-gap)]">
              <Button
                onClick={() =>
                  handleCreate(
                    "https://gm-12tk.onrender.com/api/v1/gmshop/inventory/create-inventory",
                    newInventoryInfo,
                    setNewInventoryInfo,
                    setInventorys,
                    setShowPopup
                  )
                }
                type="submit"
                text="Lưu"
              />
              <CancelButton
                onClick={() =>
                  handleCancelCreate(setShowPopup, setNewInventoryInfo)
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
