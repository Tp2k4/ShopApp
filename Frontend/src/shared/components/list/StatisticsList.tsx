import React from "react";

const NUM_COLUMNS = 6;

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
      <div className="max-h-[600px] overflow-y-auto border-b border-[var(--line-color)]">
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
                <td>{statistic.importPrice}</td>
                <td>{statistic.sellPrice}</td>
                <td className="!text-right text-red-500">
                  {statistic.totalRevenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="heading3 font-bold">Tổng:</div>
      <div className="!text-right heading3 font-bold text-red-500">
        1.500.000
      </div>
    </>
  );
}

export default StatisticsList;
