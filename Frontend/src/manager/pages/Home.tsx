import ManagerLayout from "../ManagerLayout";
import Box from "../../shared/components/ui/Box";
import ColumnChart from "../chart/ColumnChart";
import { handleImportExcel } from "../utils/handleImportExcel";

import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch("/database/home.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Lỗi khi fetch json:", err));
  }, []);

  type ChartDataItem = { name: string; value: number };
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  useEffect(() => {
    if (data?.lastestSixMonthRevenue) {
      const formattedData = Object.entries(data.lastestSixMonthRevenue).map(
        ([month, value]) => ({
          name: month,
          value: Number(String(value).replace(/\./g, "")) || 0, // loại bỏ dấu chấm nếu cần
        })
      );
      setChartData(formattedData);
    }
  }, [data]);

  const excelData = localStorage.getItem("excelData");
  const parsedData = excelData ? JSON.parse(excelData) : null;
  useEffect(() => {
    const storedData = localStorage.getItem("excelData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setData(parsed);
    }
  }, []);

  return (
    <ManagerLayout>
      <Box
        className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
        height="100%"
        width="100%"
      >
        <div className="flex w-full gap-[var(--medium-gap)]">
          <div className="w-1/3 flex flex-col border border-[var(--line-color)] rounded-md p-[var(--medium-gap)] gap-[var(--small-gap)]">
            <span>Tổng doanh thu hôm nay:</span>
            <span className="font-bold heading3">
              {data?.todayRevenue?.toLocaleString("vi-VN") || "0"}
            </span>
          </div>
          <div className="w-1/3 flex flex-col border border-[var(--line-color)] rounded-md p-[var(--medium-gap)] gap-[var(--small-gap)]">
            <span>Tổng số đơn hàng hôm nay:</span>
            <span className="font-bold heading3">{data?.todaySold || "0"}</span>
          </div>
          <div className="w-1/3 flex flex-col border border-[var(--line-color)] rounded-md p-[var(--medium-gap)] gap-[var(--small-gap)]">
            <span>Tổng người dùng hiện tại:</span>
            <span className="font-bold heading3">
              {data?.totalUsers || "0"}
            </span>
          </div>
        </div>

        {/* Lịch làm việc trong tuần của nhân viên */}
        <div className="flex flex-col gap-[var(--medium-gap)] px-[var(--medium-gap)] border border-[var(--line-color)] rounded-md overflow-hidden">
          <input type="file" accept=".xlsx" onChange={handleImportExcel} />
          {parsedData &&
            parsedData.map((item: any, index: number) => (
              <div key={index} className="grid grid-cols-7 gap-2">
                <div className="font-bold">{item["Thời điểm"]}</div>
                <div>{item["Thứ 2"]}</div>
                <div>{item["Thứ 3"]}</div>
                <div>{item["Thứ 4"]}</div>
                <div>{item["Thứ 5"]}</div>
                <div>{item["Thứ 6"]}</div>
                <div>{item["Thứ 7"]}</div>
              </div>
            ))}
        </div>

        {/* Biểu đồ doanh thu 6 tháng gần nhất */}
        <div className="flex flex-col gap-[var(--medium-gap)] px-[var(--medium-gap)] border border-[var(--line-color)] rounded-md overflow-hidden">
          <div className="font-bold pt-[var(--medium-gap)]">
            Biểu đồ doanh thu 6 tháng gần nhất
          </div>
          <ColumnChart data={chartData} />
        </div>
      </Box>
    </ManagerLayout>
  );
}

export default Home;
