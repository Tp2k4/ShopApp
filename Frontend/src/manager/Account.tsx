import { Box } from "../shared/components/ui";
import { Button } from "../shared/components/button";
import { FilterButton, SearchField } from "../shared/components/form";
import { useGet } from "../service/crudService";
import { useFilter, useSearch } from "../service/queryService";
import PopupAccount from "../shared/components/pupup/PopupAccount";
import AccountList from "../shared/components/list/AccountList";
import ManagerLayout from "./ManagerLayout";

import { useState } from "react";

function Account() {
  //================ Nhận accounts từ API
  const { data: accounts, setData: setAccounts } = useGet(
    "http://localhost:8020/api/v1/gmshop/user/alls"
  );

  //================ Lọc và tìm kiếm
  const filterOptions = ["All", "Manager", "Employee", "User"];

  // Lọc
  const {
    filteredItems: filteredByType,
    selectedFilter,
    setSelectedFilter,
  } = useFilter(accounts, filterOptions, "role");

  // Tìm kiếm
  const {
    filteredItems: filteredBySearch,
    searchQuery,
    setSearchQuery,
  } = useSearch(accounts, "name");

  // Gộp 2 kết quả lọc và tìm kiếm
  const finalFilteredItems = filteredBySearch.filter((item) =>
    filteredByType.includes(item)
  );

  //================ PopupScreen
  const [showPopup, setShowPopup] = useState(false);

  return (
    <ManagerLayout>
      <Box className="" height="100%" width="100%">
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ TÀI KHOẢN
        </div>

        {/* */}
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="px-[var(--medium-gap)] flex items-center justify-between w-full">
            <Button
              onClick={() => setShowPopup(true)}
              type="button"
              text="Thêm tài khoản"
              width="auto"
            />
            <div className="flex items-center gap-[var(--small-gap)]">
              <FilterButton
                value={selectedFilter}
                onChange={(e: any) => setSelectedFilter(e.target.value)}
                filter={filterOptions}
                text="Tất cả"
              />
              <SearchField
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                width="w-[300px]"
              />
            </div>
          </div>

          <AccountList accounts={finalFilteredItems} />
        </div>
      </Box>

      {/* Popup Screen, chức năng thêm sản phẩm nằm bên trong PopupProduct */}
      {showPopup && (
        <PopupAccount setAccounts={setAccounts} setShowPopup={setShowPopup} />
      )}
    </ManagerLayout>
  );
}

export default Account;
