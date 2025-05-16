import { LabeledInputField, SelectButton } from "../form";
import { handleCreate, handleCancelCreate } from "../../../service/crudService";
<<<<<<< HEAD:Frontend/src/shared/components/pupup/PopupInventory.tsx
import { Button, CancelButton } from "../../components/button";
import { useGet } from "../../../service/crudService";
=======
import { Button, CancelButton } from "../button";
>>>>>>> 0334971a51e4f7e2180036f6d02c033ea8029ba2:Frontend/src/shared/components/popup/PopupInventory.tsx


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
  const {data: productList} = useGet("http://localhost:8020/api/v1/gmshop/product/admin/product-name-list");
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
<<<<<<< HEAD:Frontend/src/shared/components/pupup/PopupInventory.tsx
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
=======
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
              inputFieldWidth="w-[240px]"
            />
>>>>>>> 0334971a51e4f7e2180036f6d02c033ea8029ba2:Frontend/src/shared/components/popup/PopupInventory.tsx

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
<<<<<<< HEAD:Frontend/src/shared/components/pupup/PopupInventory.tsx
              placeholder="import/ export"
              width="w-[240px]"
=======
              placeholder="Nhập/ Xuất"
              inputFieldWidth="w-[240px]"
>>>>>>> 0334971a51e4f7e2180036f6d02c033ea8029ba2:Frontend/src/shared/components/popup/PopupInventory.tsx
            />

            {/* Số lượng */}
            <LabeledInputField
              value={newInventoryInfo.quantity === 0 ? "" : String(newInventoryInfo.quantity)}
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
                    "http://localhost:8020/api/v1/gmshop/inventory/create-inventory",
                    newInventoryInfo,
                    setNewInventoryInfo,
                    setInventorys
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
