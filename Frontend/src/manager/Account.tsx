import ManagerLayout from "../shared/layout/ManagerLayout";
import Box from "../shared/components/ui/Box";
import Button from "../shared/components/button/Button";
import FilterButton from "../shared/components/form/FilterButton";
import SearchField from "../shared/components/form/SearchField";
import AccountList from "../shared/components/list/AccountList";

import { useEffect, useState } from "react";

function Account() {
  const [accounts, setAccounts] = useState<any[]>([]);
  let filter = ["Tất cả", "Nhân viên", "User", "Quản lí"];

  useEffect(() => {
    fetch("/database/account.json")
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch((err) => console.error("Lỗi khi fetch json:", err));
  }, []);

  return (
    <ManagerLayout>
      <Box className="" height="100%" width="100%">
      <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ TÀI KHOẢN
        </div>

        {/* */}
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="px-[var(--medium-gap)] flex items-center justify-between w-full">
            <Button type="button" text="Thêm tài khoản" width="auto" />
            <div className="flex items-center gap-[var(--small-gap)]">
              <FilterButton filter={filter} text="Tất cả" />
              <SearchField width="300px" />
            </div>
          </div>

          <AccountList accounts={accounts} />
        </div>
      </Box>
    </ManagerLayout>
  );
}

export default Account;
