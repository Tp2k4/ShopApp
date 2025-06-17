import React from "react";

interface StatisticsProps<T = any> {
  statistics: T[];
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

function StatisticsList({
  statistics,
  children,
  className = "",
  ...rest
}: StatisticsProps) {
  return (
    <>
      <div className="max-h-[600px] overflow-y-auto ">
        <table className={` ${className}`} {...rest}>
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng đã bán</th>
              <th>Giá nhập</th>
              <th>Giá bán</th>
              <th className="!text-right">Tổng lợi nhuận</th>
            </tr>
          </thead>

          <tbody>
            {statistics.map((statistic, index) => (
              <tr key={index}>
                <td>{statistic.date}</td>
                <td>{statistic.productName}</td>
                <td>{statistic.quantity}</td>
                <td>{statistic.importPrice.toLocaleString("vi-VN")}</td>
                <td>{statistic.sellPrice.toLocaleString("vi-VN")}</td>
                <td className="!text-right text-red-500">
                  {statistic.totalRevenue.toLocaleString("vi-VN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StatisticsList;
