import { Box } from "../../shared/components/ui";
import { Button } from "../../shared/components/button";
import { FilterButton, SearchField } from "../../shared/components/form";
import { useGet } from "../../service/crudService";
import { useFilter, useSearch } from "../../service/queryService";
import PopupAccount from "../popup/popupAdd/PopupAccount";
import PopupAccountModify from "../popup/popupModify/PopupAccountModify";
import PopupConfirmDelete from "../popup/pupupConfirmDelete/PopupConfirmDelete";
import AccountList from "../list/AccountList";
import ManagerLayout from "../ManagerLayout";

import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Account() {
  //================ Nhận accounts từ API
  const { data: accounts, setData: setAccounts } = useGet(
    "https://gm-12tk.onrender.com/api/v1/gmshop/user/alls"
  );

  //================ Lọc và tìm kiếm
  const filterOptions = ["all", "admin", "employee", "user"];

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
  const [showPopupAdd, setShowPopupAdd] = useState(false);
  const [showPopupModify, setShowPopupModify] = useState(false);
  const [showPopupConfirmDelete, setShowPopupConfirmDelete] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  // Lấy tài khoản hiện đang được chọn để chỉnh sửa đưa vào AccountList
  const [modifyingAccount, setModifyingAccount] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // Sẽ lấy account đang được chỉnh sửa lưu vào modifyingAccount nếu có id được trả về từ params
  /* Cần thêm accounts tại [id, accounts] ở dòng  useEffect bên dưới vì: lần đầu gọi API, 
     accounts sẽ chưa có dữ liệu do chưa gọi API xong, do đó account = accounts.find(...) sẽ undefined,
     vì vậy thêm accounts để account được gán lại giá trị khi đã gọi API xong. */
  useEffect(() => {
    if (id && accounts.length > 0) {
      const account = accounts.find((acc: any) => String(acc.id) === id);
      if (account) {
        setModifyingAccount(account);
      }
    }
  }, [id, accounts]);

  return (
    <ManagerLayout>
      <Box
        className="rounded-none min-h-[calc(100vh_-_var(--header-height))] px-[var(--medium-gap)]"
        width="100%"
      >
        <div className="w-full  heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ TÀI KHOẢN
        </div>

        {/* */}
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="flex justify-start flex-col gap-[var(--small-gap)] sm:flex sm:flex-row sm:items-center sm:justify-between sm:w-full">
            <div>
              <Button
                onClick={() => setShowPopupAdd(true)}
                type="button"
                text="Thêm tài khoản"
                width="auto"
              />
            </div>
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

          <div className="border border-[var(--line-color)] rounded-md overflow-hidden">
            <AccountList
              accounts={finalFilteredItems}
              setShowPopupModify={setShowPopupModify}
              setShowPopupConfirmDelete={setShowPopupConfirmDelete}
              setAccounts={setAccounts}
              setSelectedAccountId={setSelectedAccountId}
            />
          </div>
        </div>
      </Box>

      {/* Popup Screen, chức năng thêm account nằm bên trong PopupAccount */}
      {showPopupAdd && (
        <PopupAccount
          setAccounts={setAccounts}
          setShowPopup={setShowPopupAdd}
        />
      )}

      {/* Nhận vào account cần chỉnh sửa */}
      {/* setAccounts để load ngay account vừa chỉnh lên giao diện mà không cần load lại trang */}
      {/* setShowPopup để tắt Popup nếu nhấn hủy */}
      {showPopupModify && (
        <PopupAccountModify
          account={modifyingAccount}
          setAccounts={setAccounts}
          setShowPopup={setShowPopupModify}
        />
      )}

      {/* Hiển thị hợp thoại xác nhận xóa */}
      {showPopupConfirmDelete && (
        <PopupConfirmDelete
          apiPath="https://gm-12tk.onrender.com/api/v1/gmshop/user/delete/"
          setItems={setAccounts}
          setShowPopup={setShowPopupConfirmDelete}
          selectedItemId={selectedAccountId}
        />
      )}
    </ManagerLayout>
  );
}

export default Account;
