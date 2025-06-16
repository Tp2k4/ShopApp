import { Line } from "../../shared/components/ui";
import { Button } from "../../shared/components/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/paths";
interface OrderItemsProps {
  data: any;
  [key: string]: any;
}

function OrderItems({ data, ...rest }: OrderItemsProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-[var(--small-gap)]" {...rest}>
      <div>{data.orderStatus.toUpperCase()}</div> {/* trạng thái đơn hàng */}
      <Line width="w-full" /> {/* đường kẻ ngang */}
      <div className="gap-[var(--medium-gap)] w-full flex items-center justify-between">
        <div className="flex  items-center gap-[var(--medium-gap)]">
          <div className="w-[80px] h-[80px] bg-[var(--primary-color)] rounded-sm"></div>{" "}
          {/* ảnh sản phẩm */}
          <div className="flex flex-col">
            {" "}
            {/* thông tin sản phẩm */}
            <div>{data.productName}</div>
            <div className="opacity-[var(--caption-opacity)]">
              Phân loại: {data.type}
            </div>
            <div className="opacity-[var(--caption-opacity)]">
              x{data.quantity}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="flex gap-[var(--small-gap)]">
            <div className="line-through text-[var(--original-price-color)]">
              {data.originPrice.toLocaleString("vi-VN")}đ
            </div>{" "}
            {/* giá gốc */}
            <div className="text-[var(--discounted-price-color)]">
              {data.sellPrice.toLocaleString("vi-VN")}đ
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

// onClick={() => {navigate{ROUTES.USER.ITEMS_DETAIL
//               .replace(":categoryId", data.categoryId)
//               .replace(":itemId", data.orderId)
//             }}}

export default OrderItems;
