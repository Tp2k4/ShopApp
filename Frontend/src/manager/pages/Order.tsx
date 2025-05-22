import { FilterButton, SearchField } from "../../shared/components/form";
import { Box } from "../../shared/components/ui";
import { useFilter, useSearch } from "../../service/queryService";
import ManagerLayout from "../ManagerLayout";
import OrderList from "../list/OrderList";
import { useGet } from "../../service/crudService";

function Order() {
  //================ Nhận products từ API
  const { data: orders } = useGet("/database/order.json");

  //================ Lọc và tìm kiếm
  const filterOptions = [
    "all",
    "Đang chuẩn bị",
    "Đang giao hàng",
    "Đã nhận hàng",
    "Đã hủy",
  ];

  // Lọc
  const {
    filteredItems: filteredByType,
    selectedFilter,
    setSelectedFilter,
  } = useFilter(orders, filterOptions, "status");

  // Tìm kiếm
  const {
    filteredItems: filteredBySearch,
    searchQuery,
    setSearchQuery,
  } = useSearch(orders, "customerName");

  // Gộp 2 kết quả lọc và tìm kiếm
  const finalFilteredItems = filteredBySearch.filter((item) =>
    filteredByType.includes(item)
  );

  return (
    <ManagerLayout>
      <Box
        className="rounded-none min-h-[calc(100vh_-_var(--header-height))] px-[var(--medium-gap)]"
        width="100%"
      >
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ ĐƠN HÀNG
        </div>

        {/* */}
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className=" flex items-center justify-end w-full">
            <div className="flex items-center gap-[var(--small-gap)]">
              <FilterButton
                value={selectedFilter}
                onChange={(e: any) => setSelectedFilter(e.target.value)}
                filter={filterOptions}
              />
              <SearchField
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                width="w-[300px]"
              />
            </div>
          </div>

          <div className="border border-[var(--line-color)] rounded-md overflow-hidden">
            <OrderList orders={finalFilteredItems} />
          </div>
        </div>
      </Box>
    </ManagerLayout>
  );
}

export default Order;
