import {
  Button,
  CancelButton,
  DetailButton,
} from "../../shared/components/button";

import { useToggleDetail } from "../../shared/utils/useToggleDetail";

import React from "react";
import { useSearchParams } from "react-router-dom";

const NUM_COLUMNS = 8;

interface ProductListProps<T = any> {
  setShowPopupModify: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPopupConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setProducts: React.Dispatch<React.SetStateAction<T[]>>;
  setSelectedProductId: React.Dispatch<React.SetStateAction<string>>;
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
  setShowPopupModify,
  setShowPopupConfirmDelete,
  setProducts,
  setSelectedProductId,
  products,
  children,
  className = "",
  ...rest
}: ProductListProps) {
  const { openDetailIds, toggleDetail } = useToggleDetail();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="max-h-[600px] overflow-y-auto ">
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
          {products.map((product, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.brand_id}</td>
                <td>{product.category_id}</td>
                <td>{product.stock_quantity}</td>
                <td>{product.originalPrice}</td>
                <td>{product.price}</td>
                {/* Kiểm tra trạng thái hết hàng */}
                <td
                  className={product.stock_quantity <= 5 ? "text-red-500" : ""}
                >
                  {product.stock_quantity === 0
                    ? "Hết hàng"
                    : product.stock_quantity <= 5
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
                      type="button"
                      text="Chỉnh sửa"
                      width="auto"
                      onClick={() => {
                        setSearchParams(
                          (prev) => {
                            const newParams = new URLSearchParams(prev);
                            newParams.set("id", product.id);
                            return newParams;
                          },
                          { replace: true }
                        );
                        setShowPopupModify(true);
                      }}
                    />

                    <CancelButton
                      text="Xóa"
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setShowPopupConfirmDelete(true);
                      }}
                    />
                  </div>
                </td>
              </tr>
              {openDetailIds.includes(index) && (
                <tr>
                  <td className="bg-white" colSpan={NUM_COLUMNS}>
                    <div className="caption flex flex-col gap-[var(--small-gap)] border border-[var(--line-color)] rounded-md p-[var(--small-gap)]">
                      {renderItemType(product.specs, product.category_id)}
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

export default ProductList;
