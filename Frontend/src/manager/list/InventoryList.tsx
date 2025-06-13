import { Button } from "../../shared/components/button";

import React from "react";

interface AccountListProps<T = any> {
  inventories: T[];
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

function AccountList({
  inventories,
  children,
  className = "",
  ...rest
}: AccountListProps) {
  return (
    <div className="max-h-[600px] overflow-y-auto ">
      <table className={` ${className}`} {...rest}>
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Tên sản phẩm</th>
            <th>Hãng</th>
            <th>Loại</th>
            <th>Số lượng</th>
            <th>Giá gốc</th>
            <th>Giá bán</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory, index) => (
            <tr key={index}>
              <td>{inventory.date}</td>
              <td>{inventory.productName}</td>
              <td>{inventory.brand}</td>
              <td>{inventory.transactionType}</td>
              <td>{inventory.quantity}</td>
              <td>{inventory.importPrice.toLocaleString("vi-VN")}</td>
              <td>{inventory.sellPrice.toLocaleString("vi-VN")}</td>
              <td className="!py-0">
                <div className="flex gap-[var(--small-gap)] justify-end">
                  <Button type="button" text="Chỉnh sửa" width="auto" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountList;
