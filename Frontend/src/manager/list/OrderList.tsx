import { useToggleDetail } from "../../shared/utils/useToggleDetail";

import React from "react";
import { DetailButton } from "../../shared/components/button";

const NUM_COLUMNS = 6;

interface OrderListProps<T = any> {
  orders: T[];

  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

function OrderList({
  orders,
  children,
  className = "",
  ...rest
}: OrderListProps) {
  const { openDetailIds, toggleDetail } = useToggleDetail();

  return (
    <div className="max-h-[600px] overflow-y-auto ">
      <table>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Tên khách hàng</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Ngày đặt hàng</th>
            <th>Trạng thái</th>
            <th>Tổng giá</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{order.id}</td>
                <td>{order.fullName}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.email}</td>
                <td>{order.orderDate}</td>
                <td>{order.status}</td>
                <td className="text-red-500">{order.totalPrice}</td>
                <td className="!py-0">
                  <div className="flex justify-end">
                    <DetailButton
                      onClick={() => toggleDetail(index)}
                      text="Chi tiết"
                    />
                  </div>
                </td>
              </tr>

              {openDetailIds.includes(index) && (
                <tr>
                  <td className="bg-white" colSpan={NUM_COLUMNS}>
                    <div className="caption flex flex-col gap-[var(--small-gap)] border border-[var(--line-color)] rounded-md p-[var(--small-gap)]">
                      <p>
                        <strong>Địa chỉ: </strong> {order.address}{" "}
                      </p>
                      {order.products.map((product: any) => (
                        <div>
                          <p>
                            <strong>Sản phẩm: </strong> {product.productName}{" "}
                          </p>
                          <p>
                            <strong>Số lượng: </strong> {product.quantity}{" "}
                          </p>
                          <p>
                            <strong>Loại: </strong> {product.color}{" "}
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
    </div>
  );
}

export default OrderList;
