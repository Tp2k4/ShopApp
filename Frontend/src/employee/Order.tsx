import { Box, Header } from "../shared/components/ui";
import { Button } from "../shared/components/button";
import { SearchField } from "../shared/components/form";

import { useGet } from "../service/crudService";
import { useSearch } from "../service/queryService";

import OrderList from "../shared/components/list/OrderList";
import PopupOrder from "../shared/components/popup/popupAdd/PopupOrder";

import { useState } from "react";

function Order() {
  // Nhận orders từ API
  const { data: orders, setData: setOrders } = useGet("/database/order.json");

  // Tìm kiếm
  const {
    filteredItems: filteredBySearch,
    searchQuery,
    setSearchQuery,
  } = useSearch(orders, "customerName");

  // PopupScreen
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <Header role="Nhân viên" />
      <Box className="" height="100vh" width="75%">
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          DANH SÁCH ĐƠN HÀNG
        </div>
        {/* */}
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="px-[var(--medium-gap)] flex items-center justify-between w-full">
            <Button
              onClick={() => setShowPopup(true)}
              type="button"
              text="Thêm đơn hàng"
              width="auto"
            />
            <div className="flex items-center gap-[var(--small-gap)]">
              <SearchField
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                width="w-[300px]"
              />
            </div>
          </div>
          <OrderList orders={filteredBySearch} setOrders={setOrders} />
        </div>
      </Box>

      {/* Popup Screen, chức năng thêm sản phẩm nằm bên trong PopupProduct */}
      {showPopup && (
        <PopupOrder setOrders={setOrders} setShowPopup={setShowPopup} />
      )}
    </div>
  );
}

export default Order;
