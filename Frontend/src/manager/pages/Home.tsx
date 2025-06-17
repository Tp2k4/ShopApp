import ManagerLayout from "../ManagerLayout";
import Box from "../../shared/components/ui/Box";
import ColumnChart from "../chart/ColumnChart";
import { handleImportExcel } from "../utils/handleImportExcel";
import { useGet } from "../../service/crudService";

import { useEffect, useState } from "react";

function Home() {
  // Lấy doanh thu 6 tháng gần nhất
  const { data, setData } = useGet(
    "https://gm-12tk.onrender.com/api/v1/gmshop/revenue/last-six-month-revenue"
  );

  // Lấy doanh thu hôm nay
  const { data: todayRevenue } = useGet(
    "https://gm-12tk.onrender.com/api/v1/gmshop/revenue/today-revenue"
  );

  // Lấy tổng số đơn hàng bán được hôm nay
  const { data: todayOrders } = useGet(
    "https://gm-12tk.onrender.com/api/v1/gmshop/orders/today-orders"
  );

  // Lấy số người dùng hiện tại
  const { data: totalUsers } = useGet(
    "https://gm-12tk.onrender.com/api/v1/gmshop/user/get-total-user"
  );

  // Xử lí dữ liệu để truyền vào render Chart
  type ChartDataItem = { name: string; value: number };
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  type RevenueItem = {
    month: string;
    revenue: number | string;
  };
  useEffect(() => {
    if (data) {
      const formattedData = (data as RevenueItem[]).map(
        ({ month, revenue }) => ({
          name: month,
          value: Number(String(revenue).replace(/\./g, "")) || 0,
        })
      );
      setChartData(formattedData);
    }
  }, [data]);

  // Xử lí excel lịch làm việc của nhân viên
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
              {todayRevenue.toLocaleString("vi-VN") || "0"}
            </span>
          </div>
          <div className="sm:w-1/3 flex flex-col border border-[var(--line-color)] rounded-md p-[var(--medium-gap)] gap-[var(--small-gap)]">
            <span>Tổng số đơn hàng hôm nay:</span>
            <span className="font-bold heading3">{todayOrders || "0"}</span>
          </div>
          <div className="sm:w-1/3 flex flex-col border border-[var(--line-color)] rounded-md p-[var(--medium-gap)] gap-[var(--small-gap)]">
            <span>Tổng người dùng hiện tại:</span>
            <span className="font-bold heading3">{totalUsers || "0"}</span>
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
