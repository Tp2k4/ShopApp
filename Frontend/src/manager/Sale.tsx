import { SearchField } from "../shared/components/form";
import { Button } from "../shared/components/button";
import { Box } from "../shared/components/ui";
import { useGet, handleUpdate } from "../service/crudService";
import { useSearch } from "../service/queryService";
import PopupSale from "../shared/components/popup/PopupSale";
import SaleList from "../shared/components/list/SaleList";
import ManagerLayout from "./ManagerLayout";
import { useState } from "react";

function Account() {
  const { data: sales, setData: setSales } = useGet(
    "http://localhost:8020/api/v1/gmshop/promotion"
  );

  // Tìm kiếm
  const {
    filteredItems: filteredBySearch,
    searchQuery,
    setSearchQuery,
  } = useSearch(sales, "name");

  // PopupScreen
  const [showPopup, setShowPopup] = useState(false);

  return (
    <ManagerLayout>
      <Box className="" height="100%" width="100%">
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ KHUYẾN MÃI
        </div>

        {/* */}
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="px-[var(--medium-gap)] flex items-center justify-between w-full">
            <Button
              onClick={() => setShowPopup(true)}
              type="button"
              text="Thêm khuyến mãi"
              width="auto"
            />

            <SearchField
              value={searchQuery}
              onChange={(e: any) => setSearchQuery(e.target.value)}
              width="w-[300px]"
            />
          </div>

          <SaleList sales={filteredBySearch} />
        </div>
      </Box>

      {/* Popup Screen, chức năng thêm sản phẩm nằm bên trong PopupProduct */}
      {showPopup && (
        <PopupSale setSales={setSales} setShowPopup={setShowPopup} />
      )}
    </ManagerLayout>
  );
}

export default Account;
