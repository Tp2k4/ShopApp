import Button from "../button/Button";
import DetailButton from "../button/DetailButton";

import { useToggleDetail } from "../../utils/useToggleDetail";
import React from "react";

const NUM_COLUMNS = 7;

interface SaleListProps<T = any> {
  sales: T[];
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

function SaleList({ sales, children, className = "", ...rest }: SaleListProps) {
  const { openDetailIds, toggleDetail } = useToggleDetail();

  return (
    <table className={` ${className}`} {...rest}>
      <thead>
        <tr>
          <th>Stt</th>
          <th>Tên chương trình</th>
          <th>Loại khuyến mãi</th>
          <th>Trạng thái</th>
          <th>Ngày bắt đầu</th>
          <th>Ngày kết thúc</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale, index) => (
          <React.Fragment key={index}>
            <tr>
              <td>{sale.id}</td>
              <td>{sale.name}</td>
              <td>{sale.type}</td>
              <td>{sale.state}</td>
              <td>{sale.startDate}</td>
              <td>{sale.endDate}</td>
              <td className="!py-0">
                <div className="flex gap-[var(--small-gap)] justify-end">
                  <DetailButton
                    onClick={() => toggleDetail(index)}
                    text="Chi tiết"
                  />
                  <Button
                    className="text-[var(--caption)]"
                    type="button"
                    text="Chỉnh sửa"
                    width="auto"
                  />
                </div>
              </td>
            </tr>

            {openDetailIds.includes(index) && (
              <tr>
                <td className="bg-white" colSpan={NUM_COLUMNS}>
                  <div className="caption flex flex-col gap-[var(--small-gap)] border border-[var(--line-color)] rounded-md p-[var(--small-gap)]">
                    {sale.products.map((product: any, index: number) => (
                      <div key={index}>
                        <p>
                          <strong>Tên sản phẩm: </strong>
                          {product.productName}
                        </p>
                        <p>
                          <strong>Link: </strong>
                          {product.link}
                        </p>
                        <p>
                          <strong>Giảm: </strong>
                          {product.discountPercentage}
                        </p>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default SaleList;
