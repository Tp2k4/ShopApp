import { Box } from "../../shared/components/ui";
import { Button } from "../../shared/components/button";
import { InputField } from "../../shared/components/form";
import { getProductNames } from "../../shared/utils/getProductNames";
import InventoryList from "../list/InventoryList";
import ManagerLayout from "../ManagerLayout";
import PopupInventory from "../popup/popupAdd/PopupInventory";

import { useGet, useGetParams } from "../../service/crudService";

import { useState, useEffect } from "react";

function Inventory() {
  // Lọc theo ngày
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredInventories, setFilteredInventories] = useState(null);

  // Fetch API
  const { data: inventories, setData: setInventories } = useGet(
    "https://gm-12tk.onrender.com/api/v1/gmshop/inventory"
  );

  // Fetch API theo ngày
  const { data: inventoriesFilterByDate, refetch } = useGetParams(
    "https://gm-12tk.onrender.com/api/v1/gmshop/inventory/date-date",
    {
      from: startDate,
      to: endDate,
    },
    { enabled: false }
  );

  // Lấy danh sách sản phẩm để chọn trong mục thêm vào kho
  const { data: products } = useGet(
    "https://gm-12tk.onrender.com/api/v1/gmshop/user/alls"
  );
  const listProductNames = getProductNames(products);
  console.log("Danh sách sản phẩm:", listProductNames);

  // Xử lý khi nhấn nút lọc
  const handleFilter = () => {
    if (startDate && endDate) {
      refetch();
    }
  };

  useEffect(() => {
    if (startDate === "" && endDate === "") {
      setFilteredInventories(null);
    }
  }, [startDate, endDate]);

  // Cập nhật filteredInventories khi có dữ liệu lọc
  useEffect(() => {
    if (inventoriesFilterByDate) {
      setFilteredInventories(inventoriesFilterByDate);
    }
  }, [inventoriesFilterByDate]);

  const [showPopup, setShowPopup] = useState(false);

  return (
    <ManagerLayout>
      <Box
        className="rounded-none min-h-[calc(100vh_-_var(--header-height))] px-[var(--medium-gap)]"
        width="100%"
      >
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ KHO
        </div>

        {/* */}
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="flex flex-col gap-[var(--small-gap)] sm:flex sm:flex-row sm:justify-between">
            <div>
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
                    value={startDate}
                    onChange={(e: any) => setStartDate(e.target.value)}
                    type="text"
                    placeholder="2024-01-01"
                    className="w-[90px]"
                  />
                </div>
                <div className="flex items-center justify-between gap-[var(--smallest-gap)]">
                  <div>Đến: </div>
                  <InputField
                    value={endDate}
                    onChange={(e: any) => setEndDate(e.target.value)}
                    type="text"
                    placeholder="2024-01-30"
                    className="w-[90px]"
                  />
                </div>
                <Button
                  onClick={handleFilter}
                  text="Lọc đơn"
                  type="submit"
                  width="w-auto"
                />
              </div>
            </div>
          </div>

          <div className="border border-[var(--line-color)] rounded-md overflow-hidden">
            <InventoryList inventories={filteredInventories || inventories} />
          </div>
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
