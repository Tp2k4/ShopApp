import { Line } from "../../shared/components/ui";
import { Button } from "../../shared/components/button";

interface OrderItemsProps {
  data: any;
  [key: string]: any;
}

function OrderItems({ data, ...rest }: OrderItemsProps) {
  return (
    <div className="flex flex-col gap-[var(--small-gap)]" {...rest}>
      <div>{data.state.toUpperCase()}</div> {/* trạng thái đơn hàng */}
      <Line width="w-full" /> {/* đường kẻ ngang */}
      <div className="gap-[var(--medium-gap)] w-full flex items-center justify-between">
        <div className="flex  items-center gap-[var(--medium-gap)]">
          <div className="w-[80px] h-[80px] bg-[var(--primary-color)] rounded-sm"></div>{" "}
          {/* ảnh sản phẩm */}
          <div className="flex flex-col">
            {" "}
            {/* thông tin sản phẩm */}
            <div>Tai nghe gaming vippro</div>
            <div className="opacity-[var(--caption-opacity)]">
              Phân loại: Hồng
            </div>
            <div className="opacity-[var(--caption-opacity)]">x1</div>
          </div>
        </div>
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="flex gap-[var(--small-gap)]">
            <div className="line-through text-[var(--original-price-color)]">
              400000đ
            </div>{" "}
            {/* giá gốc */}
            <div className="text-[var(--discounted-price-color)]">
              500000đ
            </div>{" "}
            {/* giá đã giảm */}
          </div>
          <div className="flex justify-end">
            <Button text="Mua lại" type="button" width="w-auto" />
          </div>{" "}
          {/* nút mua lại */}
        </div>
      </div>
    </div>
  );
}

export default OrderItems;
