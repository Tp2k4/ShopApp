import Button from "../button/Button";

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
    <div className="max-h-[600px] overflow-y-auto border-b border-[var(--line-color)]">
      <table className={` ${className}`} {...rest}>
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Tên sản phẩm</th>
            <th>Hãng</th>
            <th>Loại</th>
            <th>SL nhập</th>
            <th>SL Xuất</th>
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
              {inventory.transactionType === "import" ? (
                <td>{inventory.quantity}</td>
              ) : (
                <td>{inventory.quantity}</td>
              )}
              <td>{inventory.importPrice}</td>
              <td>{inventory.sellPrice}</td>
              <td className="!py-0">
                <div className="flex gap-[var(--small-gap)] justify-end">
                  <Button
                    className="text-[var(--caption)]"
                    type="button"
                    text="Chỉnh sửa"
                    width="auto"
                  />
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
