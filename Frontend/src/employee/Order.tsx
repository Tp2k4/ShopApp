import Box from "../shared/components/ui/Box";
import Button from "../shared/components/button/Button";
import SearchField from "../shared/components/form/SearchField";
import OrderList from "../shared/components/list/OrderList";
import Header from "../shared/components/ui/Header";

import { useEffect, useState } from "react";

function Order() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/database/order.json")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Lỗi khi fetch json:", err));
  }, []);

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
            <Button type="button" text="Thêm đơn hàng" width="auto" />
            <div className="flex items-center gap-[var(--small-gap)]">
              <SearchField width="300px" />
            </div>
          </div>
          <OrderList orders={orders} />
        </div>
      </Box>
    </div>
  );
}

export default Order;
