import ManagerLayout from "../shared/layout/ManagerLayout";
import Box from "../shared/components/ui/Box";
import Button from "../shared/components/button/Button";
import SelectButton from "../shared/components/button/SelectButton";
import SearchField from "../shared/components/form/SearchField";
import List from "../shared/components/ui/List";

import { useEffect, useState } from "react";
import type { Account } from "../interface/account";

function Account() {
  const [dict, setDict] = useState<Account[]>([]);

  useEffect(() => {
    fetch("/database/account.json")
      .then((res) => res.json())
      .then((data) => setDict(data))
      .catch((err) => console.error("Lỗi khi fetch account.json:", err));
  }, []);

  return (
    <ManagerLayout>
      <Box className="" height="100%" width="100%">
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ TÀI KHOẢN
        </div>

        {/* */}
        <div className="px-[var(--medium-gap)] flex items-center justify-between w-full">
          <Button type="button" text="Thêm tài khoản" width="auto" />

          <div className="flex items-center gap-[var(--small-gap)]">
            <SelectButton text="Nhân viên" />
            <SearchField width="300px" />
          </div>
        </div>

        {/* */}
        <List dict={dict} />
      </Box>
    </ManagerLayout>
  );
}

export default Account;
