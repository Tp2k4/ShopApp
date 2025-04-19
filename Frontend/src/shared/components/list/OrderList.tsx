import Button from "../button/Button";
import CancelButton from "../button/CancelButton";
import DetailButton from "../button/DetailButton";

import { useToggleDetail } from "../../utils";
import { useNavigate } from "react-router-dom";
import React from "react";

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

  const navigate = useNavigate();

  return (
    <table className={` ${className}`} {...rest}>
      <thead>
        <tr>
          <th>Stt</th>
          <th>Tên khách hàng</th>
          <th>Số điện thoại</th>
          <th>Ngày đặt hàng</th>
          <th>Tổng giá</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <React.Fragment key={index}>
            <tr>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.phone}</td>
              <td>{order.date}</td>
              <td className="text-red-500">{order.totalPrice}</td>
              <td className="!py-0">
                <div className="flex gap-[var(--small-gap)] justify-end">
                  <DetailButton
                    onClick={() => toggleDetail(index)}
                    text="Chi tiết"
                  />
                  <Button
                    onClick={() => navigate("/employee/order-confirmation")}
                    className="text-[var(--caption)]"
                    type="button"
                    text="Lập hóa đơn"
                    width="w-auto"
                  />
                  <CancelButton text="Hủy" type="submit" width="w-auto" />
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
                          <strong>Số lượng: </strong> {product.amount}{" "}
                        </p>
                        <p>
                          <strong>Loại: </strong> {product.type}{" "}
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

export default OrderList;
