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
          <React.Fragment key={index}>
            <tr className="border-b border-[var(--line-color)]">
              <td className="!align-top">{statistic.date}</td>
              <td>
                {statistic.products.map((product: any) => (
                  <div>{product.productName}</div>
                ))}
              </td>
              <td>
                {statistic.products.map((product: any) => (
                  <div>{product.selledAmount}</div>
                ))}
              </td>
              <td>
                {statistic.products.map((product: any) => (
                  <div>{product.importPrice}</div>
                ))}
              </td>

              <td>
                {statistic.products.map((product: any) => (
                  <div>{product.sellPrice}</div>
                ))}
              </td>
              <td className="!text-right text-red-500">
                {statistic.products.map((product: any) => (
                  <div>{product.totalRevenue}</div>
                ))}
              </td>
            </tr>
          </React.Fragment>
        ))}
        <tr className="border-b border-[var(--line-color)]">
          <td colSpan={NUM_COLUMNS - 1}>
            <div className="heading3 font-bold">Tổng:</div>
          </td>
          <td>
            <div className="!text-right heading3 font-bold text-red-500">
              1.500.000
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default StatisticsList;
