import { Box } from "../shared/components/ui";
import { Button } from "../shared/components/button";
import { useGet } from "../service/crudService";
import { FilterButton, InputField } from "../shared/components/form";
import StatisticsList from "../shared/components/list/StatisticsList";
import ManagerLayout from "./ManagerLayout";

import { useEffect, useState } from "react";

function Dashboard() {
  //================ Nhận accounts từ API
  const { data: statistics, setData: setStatistics } = useGet(
    "/database/statistics.json"
  );

  const filterOptions = ["Ngày", "Tháng", "Năm"];

  return (
    <ManagerLayout>
      <Box className="" height="100%" width="100%">
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ THỐNG KÊ
        </div>

        {/* */}
        <div className="flex flex-col items-end gap-[var(--medium-gap)]">
          {/* */}
          <div className="flex items-start gap-[var(--medium-gap)] px-[var(--medium-gap)]">
            <FilterButton filter={filterOptions} />

            {/* Lọc ngày */}
            <div className="flex flex-col gap-[var(--small-gap)] items-start">
              <div className="flex gap-[var(--small-gap)]">
                <div className="flex items-center justify-between gap-[var(--smallest-gap)]">
                  <div>Từ: </div>
                  <InputField
                    type="text"
                    placeholder="1/1/2024"
                    width="w-[90px]"
                  />
                </div>
                <div className="flex items-center justify-between gap-[var(--smallest-gap)]">
                  <div>Đến: </div>
                  <InputField
                    type="text"
                    placeholder="30/1/2024"
                    width="w-[90px]"
                  />
                </div>
                <Button text="Lọc đơn" type="submit" width="w-auto" />
              </div>
            </div>
          </div>

          <StatisticsList statistics={statistics} />
        </div>

        <div className=" font-bold p-[var(--medium-gap)]">Biểu đồ thống kê</div>
      </Box>
    </ManagerLayout>
  );
}

export default Dashboard;
