import { Box } from "../shared/components/ui";
import { Button } from "../shared/components/button";
import { useGet, useGetParams } from "../service/crudService";
import { InputField } from "../shared/components/form";
import StatisticsList from "../shared/components/list/StatisticsList";
import ManagerLayout from "./ManagerLayout";

import { useEffect, useState } from "react";

function Dashboard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredStatistics, setFilteredStatistics] = useState(null);

  //================ Nhận accounts từ API
  const { data: statistics } = useGet(
    "http://localhost:8020/api/v1/gmshop/revenue/alls"
  );

  const { data: statisticsFilterByDate, refetch } = useGetParams(
    "http://localhost:8020/api/v1/gmshop/revenue/date-date",
    {
      start_date: startDate,
      end_date: endDate,
    },
    { enabled: false }
  );

  // Xử lý khi nhấn nút lọc
  const handleFilter = () => {
    if (startDate && endDate) {
      refetch();
    }
  };

  // Cập nhật filteredStatistics khi có dữ liệu lọc
  useEffect(() => {
    if (statisticsFilterByDate) {
      setFilteredStatistics(statisticsFilterByDate);
    }
  }, [statisticsFilterByDate]);

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
            {/* Lọc ngày */}
            <div className="flex flex-col gap-[var(--small-gap)] items-start">
              <div className="flex gap-[var(--small-gap)]">
                <div className="flex items-center justify-between gap-[var(--smallest-gap)]">
                  <div>Từ: </div>
                  <InputField
                    value={startDate}
                    onChange={(e: any) => setStartDate(e.target.value)}
                    type="text"
                    placeholder="2024-01-01"
                    width="w-[90px]"
                  />
                </div>
                <div className="flex items-center justify-between gap-[var(--smallest-gap)]">
                  <div>Đến: </div>
                  <InputField
                    value={endDate}
                    onChange={(e: any) => setEndDate(e.target.value)}
                    type="text"
                    placeholder="2024-01-30"
                    width="w-[90px]"
                  />
                </div>
                <Button
                  onClick={handleFilter}
                  text="Lọc đơn"
                  type="submit"
                  width="w-auto"
                />
              </div>
            </div>
          </div>

          <StatisticsList statistics={filteredStatistics || statistics} />
        </div>

        <div className=" font-bold p-[var(--medium-gap)]">Biểu đồ thống kê</div>
      </Box>
    </ManagerLayout>
  );
}

export default Dashboard;
