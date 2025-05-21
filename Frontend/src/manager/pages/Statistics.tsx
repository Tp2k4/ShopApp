import { Box } from "../../shared/components/ui";
import { Button } from "../../shared/components/button";
import { useGet, useGetParams } from "../../service/crudService";
import { InputField } from "../../shared/components/form";
import StatisticsList from "../list/StatisticsList";
import ManagerLayout from "../ManagerLayout";
import TotalRevenueChart from "../chart/ColumnChart";

import { useEffect, useState, useMemo } from "react";

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

  // Nhóm các doanh thu cùng ngày để tính tổng doanh thu trong ngày đó, hiển thị vào chart
  const groupedData = useMemo(() => {
    return (filteredStatistics || statistics)?.reduce((acc: any, curr: any) => {
      const date = curr.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += Number(curr.totalRevenue || 0);
      return acc;
    }, {});
  }, [filteredStatistics, statistics]);

  // Tạo đối tượng cho chart Data
  const chartData = useMemo(() => {
    return Object.entries(groupedData as Record<string, number>).map(
      ([date, total]) => ({
        name: date,
        value: total,
      })
    );
  }, [groupedData]);

  // Tổng doanh thu
  const totalRevenue = useMemo(() => {
    return Object.values(groupedData || {}).reduce(
      (sum: number, total: any) => sum + Number(total),
      0
    );
  }, [groupedData]);

  return (
    <ManagerLayout>
      <Box className="rounded-none min-h-[calc(100vh_-_var(--header-height))] w-full flex flex-col gap-[var(--mediun-gap)] px-[var(--medium-gap)]">
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ THỐNG KÊ
        </div>

        {/* */}
        <div className="flex flex-col gap-[var(--medium-gap)]">
          {/* */}
          <div className="flex items-start gap-[var(--medium-gap)]">
            {/* Lọc ngày */}
            <div className="w-full flex flex-col gap-[var(--small-gap)] items-end">
              <div className="flex gap-[var(--small-gap)]">
                <div className="flex items-center gap-[var(--smallest-gap)]">
                  <div>Từ: </div>
                  <InputField
                    value={startDate}
                    onChange={(e: any) => setStartDate(e.target.value)}
                    type="text"
                    placeholder="2024-01-01"
                    width="w-[90px]"
                  />
                </div>
                <div className="flex items-center gap-[var(--smallest-gap)]">
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

          <div className="border border-[var(--line-color)] rounded-md overflow-hidden">
            <StatisticsList statistics={filteredStatistics || statistics} />
          </div>

          {/* Tổng doanh thu */}
          <div className="flex items-center justify-between border border-[var(--line-color)] rounded-md ">
            <div className=" font-bold pl-[var(--medium-gap)]">
              Tổng doanh thu:
            </div>
            <div className="p-[var(--medium-gap)] font-bold text-red-500">
              {totalRevenue.toLocaleString("vi-VN")}
            </div>
          </div>

          {/* Biểu đồ doanh thu */}
          <div className="h-full flex flex-col gap-[var(--medium-gap)] px-[var(--medium-gap)] border border-[var(--line-color)] rounded-md overflow-hidden">
            <div className="font-bold pt-[var(--medium-gap)]">
              Biểu đồ thống kê
            </div>
            <TotalRevenueChart data={chartData} />
          </div>
        </div>
      </Box>
    </ManagerLayout>
  );
}

export default Dashboard;
