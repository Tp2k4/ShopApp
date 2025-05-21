import { Box, Header, Line } from "../../shared/components/ui";
import { Button } from "../../shared/components/button";

import { useEffect, useState } from "react";

function OrderComfirmation() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/database/order.json")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Lỗi khi fetch json:", err));
  }, []);

  // Do chưa biết phải xử lí api cho trang này như thế nào nên lấy đại order đầu tiên làm demo
  const order = orders[0];
  if (!order) return <div>Đang tải...</div>;

  return (
    <div className="w-screen h-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <Header role="Nhân viên" />
      <Box
        className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
        height="100vh"
        width="75%"
      >
        <div className="font-bold heading3">
          Xác nhận giao hàng cho đơn hàng của bạn từ Gaming Gear bởi SieuToc
        </div>
        <Line width="w-full" />
        <div className="caption flex justify-between ">
          <div className="flex flex-col ">
            <div>
              <strong>GamingGear by SieuToc</strong>{" "}
              &lt;sales@gaminggear.com.vn&gt;
            </div>
            <div>
              Đến: {order.customerName} &lt;{order.email}&gt;
            </div>
          </div>
          <div>T6, 6/12/2024 vào lúc 16:24</div>
        </div>
        <div className="px-[var(--medium-gap)] flex flex-col gap-[var(--medium-gap)]">
          <div>Xin chào {order.customerName}</div>
          <div>
            Sản phẩm trong đơn hàng của Anh/chị tại cửa hàng{" "}
            <strong>GamingGear</strong> sẽ được giao tới địa chỉ nhận hang theo
            thông tin sau:
          </div>
          <div className="flex flex-col gap-[var(--small-gap)]">
            <div>
              <div>
                <strong>Thông tin giao hàng:</strong>{" "}
              </div>
              <div>Ngày tạo giao hang: 06/12/2024</div>
            </div>
            <div className="w-full border border-[var(--line-color)]">
              <div className="flex">
                <div className="border-b border-[var(--line-color)] flex-1/3 p-[var(--medium-gap)] flex flex-col gap-[var(--medium-gap)]">
                  <div>
                    <strong>Thông tin người nhận</strong>
                  </div>
                  <div className="w-full flex">
                    <div className="w-1/3">
                      <div>Họ và tên: </div>
                      <div>Số điện thoại: </div>
                      <div>Địa chỉ: </div>
                    </div>
                    <div className="w-2/3">
                      <div>{order.customerName}</div>
                      <div>{order.phone}</div>
                      <div>{order.address}</div>
                    </div>
                  </div>
                </div>
                <div className="flex-2/3 p-[var(--medium-gap)] border-l border-b border-[var(--line-color)] flex flex-col gap-[var(--medium-gap)]">
                  <div>
                    <strong>Hình thức vận chuyển</strong>
                  </div>
                  <div>
                    <div>GIAO NHANH: 24H đơn hang dưới 300.000đ</div>
                    <div>Giao từ thứ 2 đến thứ 7</div>
                  </div>
                </div>
              </div>

              {/* */}
              <div className="p-[var(--medium-gap)] flex flex-col gap-[var(--medium-gap)]">
                <div>
                  <strong>Sản phẩm được giao</strong>
                </div>

                <div className="w-1/2">
                  <div className="flex">
                    <div className="w-3/5">
                      <strong>Tên</strong>
                    </div>
                    <div className="w-1/5">
                      <strong>Loại</strong>
                    </div>
                    <div className="w-1/5">
                      <strong>Số lượng</strong>
                    </div>
                  </div>
                  {order.products.map((product: any) => (
                    <div className="flex">
                      <div className="w-3/5">{product.productName}</div>
                      <div className="w-1/5">{product.type}</div>
                      <div className="w-1/5">{product.amount}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-[var(--smallest-gap)] p-[var(--medium-gap)] border-t border-[var(--line-color)]">
                <div>
                  <strong>Tổng tiền:</strong>{" "}
                </div>
                <div className="text-red-500">{order.totalPrice}đ</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button text="Gửi" type="button" />
            <div>
              <div className="text-right">Trân trọng</div>
              <div>
                <strong>Ban quản trị của hàng Gaming Gear by Sieu Toc</strong>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default OrderComfirmation;
