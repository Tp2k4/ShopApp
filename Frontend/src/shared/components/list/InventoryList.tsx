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
    <table className={` ${className}`} {...rest}>
      <thead>
        <tr>
          <th>Ngày</th>
          <th>Tên sản phẩm</th>
          <th>Hãng</th>
          <th>Loại</th>
          <th>SL nhập</th>
          <th>SL Xuất</th>
          <th>Giá nhập</th>
          <th>Giá bán</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {inventories.map((inventory, index) => (
          <React.Fragment key={index}>
            <tr className="border-b border-[var(--line-color)]">
              <td className="!align-top">{inventory.transactionDate}</td>
              <td>
                {inventory.products.map((product: any) => (
                  <div>{product.productName}</div>
                ))}
              </td>
              <td>
                {inventory.products.map((product: any) => (
                  <div>{product.company}</div>
                ))}
              </td>
              <td>
                {inventory.products.map((product: any) => (
                  <div>{product.type}</div>
                ))}
              </td>

              <td>
                {inventory.products.map((product: any) =>
                  product.transactionType === "import" ? (
                    <div>{product.amount}</div>
                  ) : (
                    <div>-</div>
                  )
                )}
              </td>

              <td>
                {inventory.products.map((product: any) =>
                  product.transactionType === "export" ? (
                    <div>{product.amount}</div>
                  ) : (
                    <div>-</div>
                  )
                )}
              </td>

              <td>
                {inventory.products.map((product: any) => (
                  <div>{product.importPrice}</div>
                ))}
              </td>
              <td>
                {inventory.products.map((product: any) => (
                  <div>{product.sellPrice}</div>
                ))}
              </td>

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
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default AccountList;
