import Button from "../button/Button";
import DetailButton from "../button/DetailButton";

import React from "react";
import { useToggleDetail } from "../../utils";

const NUM_COLUMNS = 8;

interface ProductListProps<T = any> {
  products: T[];
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const renderItemType = (details: any, type: string) => {
  switch (type) {
    case "mouse":
      return (
        <div>
          <p>
            <strong>Pin: </strong>
            {details.battery}
          </p>
          <p>
            <strong>Hãng: </strong>
            {details.company}
          </p>
          <p>
            <strong>Bảo hành: </strong>
            {details.warranty}
          </p>
          <p>
            <strong>Loại kết nối: </strong>
            {details.connectionType}
          </p>
          <p>
            <strong>DPI: </strong>
            {details.maxDpi}
          </p>
          <p>
            <strong>Màu: </strong>
            {details.color}
          </p>
          <p>
            <strong>Led: </strong>
            {details.led}
          </p>
          <p>
            <strong>Cân nặng: </strong>
            {details.weight}
          </p>
        </div>
      );
    case "keyboard":
      return (
        <div>
          <p>
            <strong>Pin: </strong>
            {details.battery}
          </p>
          <p>
            <strong>Hãng: </strong>
            {details.company}
          </p>
          <p>
            <strong>Bảo hành: </strong>
            {details.warranty}
          </p>
          <p>
            <strong>Loại kết nối: </strong>
            {details.connectionType}
          </p>
          <p>
            <strong>Phím số: </strong>
            {details.numKeys}
          </p>
          <p>
            <strong>Màu: </strong>
            {details.color}
          </p>
          <p>
            <strong>Led: </strong>
            {details.led}
          </p>
          <p>
            <strong>Loại switch: </strong>
            {details.switchType}
          </p>
          <p>
            <strong>Cân nặng: </strong>
            {details.weight}
          </p>
        </div>
      );
    case "headphone":
      return (
        <div>
          <p>
            <strong>Pin: </strong>
            {details.battery}
          </p>
          <p>
            <strong>Hãng: </strong>
            {details.company}
          </p>
          <p>
            <strong>Bảo hành: </strong>
            {details.warranty}
          </p>
          <p>
            <strong>Loại kết nối: </strong>
            {details.connectionType}
          </p>
          <p>
            <strong>Mic: </strong>
            {details.hasMic}
          </p>
          <p>
            <strong>Khử tiếng ồn: </strong>
            {details.noiseCancelling}
          </p>
          <p>
            <strong>Màu: </strong>
            {details.color}
          </p>
          <p>
            <strong>Led: </strong>
            {details.led}
          </p>
          <p>
            <strong>Cân nặng: </strong>
            {details.weight}
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
              <td>{item.type}</td>
              <td>{item.amount}</td>
              <td>{item.importPrice}</td>
              <td>{item.sellPrice}</td>
              <td>{item.state}</td>
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
                    {renderItemType(item.details, item.type)}
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
