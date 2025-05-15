import Button from "../button/Button";
import DetailButton from "../button/DetailButton";

import React from "react";
import { useToggleDetail } from "../../utils/useToggleDetail";

const NUM_COLUMNS = 8;

interface ProductListProps<T = any> {
  products: T[];
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const renderItemType = (specs: any, type: string) => {
  switch (type) {
    case "mouse":
      return (
        <div>
          <p>
            <strong>Pin: </strong>
            {specs.battery}
          </p>
          <p>
            <strong>Bảo hành: </strong>
            {specs.warranty}
          </p>
          <p>
            <strong>Loại kết nối: </strong>
            {specs.connectionType}
          </p>
          <p>
            <strong>DPI: </strong>
            {specs.maxDpi}
          </p>
          <p>
            <strong>Màu: </strong>
            {specs.color}
          </p>
          <p>
            <strong>Led: </strong>
            {specs.led ? "Có" : "Không"}
          </p>
          <p>
            <strong>Cân nặng: </strong>
            {specs.weight}
          </p>
        </div>
      );
    case "keyboard":
      return (
        <div>
          <p>
            <strong>Pin: </strong>
            {specs.battery}
          </p>
          <p>
            <strong>Bảo hành: </strong>
            {specs.warranty}
          </p>
          <p>
            <strong>Loại kết nối: </strong>
            {specs.connectionType}
          </p>
          <p>
            <strong>Phím số: </strong>
            {specs.numKeys}
          </p>
          <p>
            <strong>Màu: </strong>
            {specs.color}
          </p>
          <p>
            <strong>Led: </strong>
            {specs.led ? "Có" : "Không"}
          </p>
          <p>
            <strong>Loại switch: </strong>
            {specs.switchType}
          </p>
          <p>
            <strong>Cân nặng: </strong>
            {specs.weight}
          </p>
        </div>
      );
    case "headphone":
      return (
        <div>
          <p>
            <strong>Pin: </strong>
            {specs.battery}
          </p>

          <p>
            <strong>Bảo hành: </strong>
            {specs.warranty}
          </p>
          <p>
            <strong>Loại kết nối: </strong>
            {specs.connectionType}
          </p>
          <p>
            <strong>Mic: </strong>
            {specs.hasMic ? "Có" : "Không"}
          </p>
          <p>
            <strong>Khử tiếng ồn: </strong>
            {specs.noiseCancelling ? "Có" : "Không"}
          </p>
          <p>
            <strong>Màu: </strong>
            {specs.color}
          </p>
          <p>
            <strong>Led: </strong>
            {specs.led ? "Có" : "Không"}
          </p>
          <p>
            <strong>Cân nặng: </strong>
            {specs.weight}
          </p>
        </div>
      );
    default:
      return <p>Loại sản phẩm không xác định</p>;
  }
};

function ProductList({
  products,
  children,
  className = "",
  ...rest
}: ProductListProps) {
  const { openDetailIds, toggleDetail } = useToggleDetail();

  return (
    <table className={` ${className}`} {...rest}>
      <thead>
        <tr>
          <th>Stt</th>
          <th>Tên sản phẩm</th>
          <th>Hãng</th>
          <th>Phân loại</th>
          <th>Số lượng</th>
          <th>Giá gốc</th>
          <th>Giá bán</th>
          <th>Trạng thái</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((item, index) => (
          <React.Fragment key={index}>
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.brand_id}</td>
              <td>{item.category_id}</td>
              <td>{item.stock_quantity}</td>
              <td>{item.originPrice}</td>
              <td>{item.price}</td>

              {/* Kiểm tra trạng thái hết hàng */}
              <td className={item.stock_quantity <= 5 ? "text-red-500" : ""}>
                {item.stock_quantity === 0
                  ? "Hết hàng"
                  : item.stock_quantity <= 5
                  ? "Sắp hết hàng"
                  : "Còn hàng"}
              </td>
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
                    {renderItemType(item.specs, item.category_id)}
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

export default ProductList;
