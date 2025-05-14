import { Box } from "../shared/components/ui";
import { Button } from "../shared/components/button";
import { SelectButton, InputField } from "../shared/components/form";
import { getProductNames } from "../shared/utils/getProductNames";
import InventoryList from "../shared/components/list/InventoryList";
import ManagerLayout from "./ManagerLayout";
import PopupInventory from "../shared/components/pupup/PopupInventory";
import { useGet } from "../service/crudService";

import { useState } from "react";

function Inventory() {
  const { data: inventories, setData: setInventories } = useGet(
    "http://localhost:8020/api/v1/gmshop/inventory"
  );

  const { data: products, setData: setProducts } = useGet(
    "http://localhost:8020/api/v1/gmshop/user/alls"
  );

  const listProductNames = getProductNames(products);
  const [showPopup, setShowPopup] = useState(false);

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
                <Button
                  onClick={() => setShowPopup(true)}
                  text="Thêm vào kho"
                  type="submit"
                  width="w-auto"
                />
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
                  <Button text="Lọc đơn" type="submit" width="w-auto" />
                </div>
              </div>
            </div>
          </div>

          <InventoryList inventories={inventories} />
        </div>
      </Box>

      {/* Popup Screen, chức năng thêm sản phẩm nằm bên trong PopupProduct */}
      {showPopup && (
        <PopupInventory
          setInventorys={setInventories}
          setShowPopup={setShowPopup}
        />
      )}
    </ManagerLayout>
  );
}

export default Inventory;
