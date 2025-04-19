import ManagerLayout from "../shared/layout/ManagerLayout";
import Box from "../shared/components/ui/Box";
import Button from "../shared/components/button/Button";
import SelectButton from "../shared/components/form/SelectButton";
import InventoryList from "../shared/components/list/InventoryList";
import InputField from "../shared/components/form/InputField";

import { getProductNames } from "../shared/utils";
import { useEffect, useState } from "react";

function Inventory() {
  const [inventories, setInventories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/database/inventory.json")
      .then((res) => res.json())
      .then((data) => setInventories(data))
      .catch((err) => console.error("Lỗi khi fetch json:", err));
  }, []);

  useEffect(() => {
    fetch("/database/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi khi fetch json:", err));
  }, []);

  const listProductNames = getProductNames(products);

  return (
    <ManagerLayout>
      <Box className="" height="100%" width="100%">
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ KHO
        </div>

        {/* */}
        <div className="flex flex-col  gap-[var(--medium-gap)]">
          <div className="px-[var(--medium-gap)] flex flex-col gap-[var(--medium-gap)]">
            {/* */}
            <div className="flex justify-between">
              <div className="flex flex-col items-start gap-[var(--small-gap)]">
                <div className="flex gap-[var(--small-gap)]">
                  <SelectButton dataset={listProductNames} width="w-[180px]" />

                  <SelectButton dataset={["Nhập", "Xuất"]} width="w-[90px]" />
                  <InputField
                    placeholder="Số lượng"
                    width="w-[90px]"
                    type="text"
                  />
                </div>
                <Button text="Thêm vào kho" type="submit" width="w-auto" />
              </div>

              {/* */}
              <div className="flex flex-col items-start gap-[var(--small-gap)]">
                <div className="flex gap-[var(--small-gap)]">
                  <div className="flex items-center justify-between gap-[var(--smallest-gap)]">
                    <div>Từ: </div>
                    <InputField
                      type="text"
                      placeholder="1/1/2024"
                      width="w-[90px]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-[var(--smallest-gap)]">
                    <div>Đến: </div>
                    <InputField
                      type="text"
                      placeholder="30/1/2024"
                      width="w-[90px]"
                    />
                  </div>
                </div>

                <Button text="Lọc đơn" type="submit" width="w-auto" />
              </div>
            </div>
          </div>

          <InventoryList inventories={inventories} />
        </div>
      </Box>
    </ManagerLayout>
  );
}

export default Inventory;
