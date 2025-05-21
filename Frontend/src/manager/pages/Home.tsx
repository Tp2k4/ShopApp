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
        className="rounded-none min-h-[calc(100vh_-_var(--header-height))] flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
        width="100%"
      >
        <div className="flex sm:flex-row flex-col w-full gap-[var(--medium-gap)]">
          <div className="sm:w-1/3 flex flex-col border border-[var(--line-color)] rounded-md p-[var(--medium-gap)] gap-[var(--small-gap)]">
            <span>Tổng doanh thu hôm nay:</span>
            <span className="font-bold heading3">
              {data?.todayRevenue?.toLocaleString("vi-VN") || "0"}
            </span>
          </div>
          <div className="sm:w-1/3 flex flex-col border border-[var(--line-color)] rounded-md p-[var(--medium-gap)] gap-[var(--small-gap)]">
            <span>Tổng số đơn hàng hôm nay:</span>
            <span className="font-bold heading3">{data?.todaySold || "0"}</span>
          </div>
          <div className="sm:w-1/3 flex flex-col border border-[var(--line-color)] rounded-md p-[var(--medium-gap)] gap-[var(--small-gap)]">
            <span>Tổng người dùng hiện tại:</span>
            <span className="font-bold heading3">
              {data?.totalUsers || "0"}
            </span>
          </div>
        </div>

        {/* Lịch làm việc trong tuần của nhân viên */}
        <div className="min-h-[85px] flex flex-col border border-[var(--line-color)] rounded-md overflow-hidden">
          <label className="bg-[var(--background-color)] border-b border-[var(--line-color)] font-bold w-full  cursor-pointer flex items-center justify-center py-[var(--small-gap)]">
            Chọn file Excel
            <input
              type="file"
              accept=".xlsx"
              onChange={handleImportExcel}
              className="hidden"
            />
          </label>
          {parsedData && (
            <div className="overflow-x-auto h-full w-full">
              <table className="overflow-x-auto">
                <thead>
                  <tr className=" border-b border-[var(--line-color)]">
                    <th>Thời điểm</th>
                    <th>Thứ 2</th>
                    <th>Thứ 3</th>
                    <th>Thứ 4</th>
                    <th>Thứ 5</th>
                    <th>Thứ 6</th>
                    <th>Thứ 7</th>
                    <th>Chủ nhật</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedData.map((item: any, index: number) => (
                    <tr className="!bg-white" key={index}>
                      <td>{item["Thời điểm"]}</td>
                      <td>{item["Thứ 2"]}</td>
                      <td>{item["Thứ 3"]}</td>
                      <td>{item["Thứ 4"]}</td>
                      <td>{item["Thứ 5"]}</td>
                      <td>{item["Thứ 6"]}</td>
                      <td>{item["Thứ 7"]}</td>
                      <td>{item["Chủ nhật"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
