// import { Box, Header } from "../../shared/components/ui";
// import { Button } from "../../shared/components/button";
// import { FilterButton, SearchField } from "../../shared/components/form";

// import { useGet } from "../../service/crudService";
// import { useSearch, useFilter } from "../../service/queryService";

// import OrderListEmployee from "../list/OrderListEmployee";
// import PopupOrder from "../popup/PopupOrder";

// import { useState } from "react";

// function OrderEmployee() {
//   // Nhận orders từ API
//   const { data: orders, setData: setOrders } = useGet(
//     "https://gm-12tk.onrender.com/api/v1/gmshop/orders/getall"
//   );

//   // Lấy thông tin employee hiện tại, mục đích là lấy tên hiển thị lên Header
//   const userDataString = localStorage.getItem("user");
//   const userData = userDataString ? JSON.parse(userDataString) : null;

//   //================ Lọc và tìm kiếm
//   const filterOptions = ["all", "pending", "delivered", "shipping", "deleted"];

//   // Lọc
//   const {
//     filteredItems: filteredByType,
//     selectedFilter,
//     setSelectedFilter,
//   } = useFilter(orders, filterOptions, "status");

//   // Tìm kiếm
//   const {
//     filteredItems: filteredBySearch,
//     searchQuery,
//     setSearchQuery,
//   } = useSearch(orders, "fullName");

//   // Gộp 2 kết quả lọc và tìm kiếm
//   const finalFilteredItems = filteredBySearch.filter((item) =>
//     filteredByType.includes(item)
//   );

//   // PopupScreen
//   const [showPopup, setShowPopup] = useState(false);

//   return (
//     <div className="w-screen h-screen flex flex-col items-center overflow-y-auto overflow-x-hidden min-h-0">
//       <Header
//         className="border-b border-[var(--line-color)] "
//         name={userData?.name}
//       />
//       <Box
//         className="rounded-none min-h-[calc(100vh_-_var(--header-height))] px-[var(--medium-gap)]"
//         width="100%"
//       >
//         <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
//           DANH SÁCH ĐƠN HÀNG
//         </div>
//         {/* */}
//         <div className="flex flex-col gap-[var(--medium-gap)]">
//           <div className=" flex flex-col gap-[var(--small-gap)] sm:flex sm:flex-row  sm:justify-between sm:w-full">
//             <div>
//               <Button
//                 onClick={() => setShowPopup(true)}
//                 type="button"
//                 text="Thêm đơn hàng"
//                 width="auto"
//               />
//             </div>
//             <div className="flex items-center gap-[var(--small-gap)]">
//               <FilterButton
//                 value={selectedFilter}
//                 onChange={(e: any) => setSelectedFilter(e.target.value)}
//                 filter={filterOptions}
//               />
//               <SearchField
//                 value={searchQuery}
//                 onChange={(e: any) => setSearchQuery(e.target.value)}
//                 width="w-[300px]"
//               />
//             </div>
//           </div>
//           <div className="border border-[var(--line-color)] rounded-md overflow-hidden">
//             <OrderListEmployee
//               orders={finalFilteredItems}
//               setOrders={setOrders}
//             />
//           </div>
//         </div>
//       </Box>

//       {/* Popup Screen, chức năng thêm sản phẩm nằm bên trong PopupProduct */}
//       {showPopup && (
//         <PopupOrder setOrders={setOrders} setShowPopup={setShowPopup} />
//       )}
//     </div>
//   );
// }

// export default OrderEmployee;

import { Box, Header } from "../../shared/components/ui";
import { Button } from "../../shared/components/button";
import { FilterButton, SearchField } from "../../shared/components/form";

import { useGet } from "../../service/crudService";
import { useSearch, useFilter } from "../../service/queryService";

import OrderListEmployee from "../list/OrderListEmployee";
import PopupOrder from "../popup/PopupOrder";

import { useState, useMemo } from "react";

function OrderEmployee() {
  // Nhận orders từ API
  const { data: orders, setData: setOrders } = useGet(
    "https://gm-12tk.onrender.com/api/v1/gmshop/orders/getall"
  );

  // Lấy thông tin employee hiện tại, mục đích là lấy tên hiển thị lên Header
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const pendingOrders = useMemo(() => {
    return orders.filter(
      (order: any) => order.status?.toLowerCase().trim() === "pending"
    );
  }, [orders]);

  // Tìm kiếm
  const {
    filteredItems: finalFilteredItems,
    searchQuery,
    setSearchQuery,
  } = useSearch(pendingOrders, "fullName");

  // PopupScreen
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col items-center overflow-y-auto overflow-x-hidden min-h-0">
      <Header
        className="border-b border-[var(--line-color)] "
        name={userData?.name}
      />
      <Box
        className="rounded-none min-h-[calc(100vh_-_var(--header-height))] px-[var(--medium-gap)]"
        width="100%"
      >
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          DANH SÁCH ĐƠN HÀNG
        </div>
        {/* */}
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className=" flex flex-col gap-[var(--small-gap)] sm:flex sm:flex-row  sm:justify-between sm:w-full">
            <div>
              <Button
                onClick={() => setShowPopup(true)}
                type="button"
                text="Thêm đơn hàng"
                width="auto"
              />
            </div>
            <div className="flex items-center gap-[var(--small-gap)]">
              <SearchField
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                width="w-[300px]"
              />
            </div>
          </div>
          <div className="border border-[var(--line-color)] rounded-md overflow-hidden">
            <OrderListEmployee
              orders={finalFilteredItems}
              setOrders={setOrders}
            />
          </div>
        </div>
      </Box>

      {/* Popup Screen, chức năng thêm sản phẩm nằm bên trong PopupProduct */}
      {showPopup && (
        <PopupOrder setOrders={setOrders} setShowPopup={setShowPopup} />
      )}
    </div>
  );
}

export default OrderEmployee;
