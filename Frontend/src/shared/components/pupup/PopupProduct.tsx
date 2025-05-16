import { LabeledInputField } from "../form/LabeledInputField";
import {
  handleCreateProduct,
  handleCancelCreate,
} from "../../../service/crudService";
import { SelectButton, ImportImage } from "../../components/form";
import { Button, CancelButton } from "../../components/button";

import { useState } from "react";

interface PopupProductProps {
  setProducts: React.Dispatch<React.SetStateAction<any>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupProduct = ({ setProducts, setShowPopup }: PopupProductProps) => {
  // Thêm ảnh
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  // State quản lý thông tin sản phẩm
  const [newProductInfo, setNewProductInfo] = useState({
    name: "",
    price: 0,
    battery: "",
    warranty: "",
    connectionType: "",
    weight: 0,
    brand_id: "",
    color: "",
    led: false,
    maxDpi: 0,
    hasMic: false,
    noiseCancelling: false,
    numKeys: 0,
    switchType: "",
    thumbnail: imageURLs[0] || "",
    stock_quantity: 0,
    category_id: "",
    importPrice: 0,
    description1: "",
    description2: "",
    description3: "",
  });

  // State quản lý thông số kỹ thuật đặc thù
  const types = ["mouse", "keyboard", "headphone"];
  const [selectedType, setSelectedType] = useState<string>("");

  return (
    <div className="fixed z-49 inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        {/* Info */}
        <div className="flex">
          {/* Left */}
          <div className="pr-[var(--big-gap)] flex flex-col gap-[var(--medium-gap)]">
            <div>Thông tin sản phẩm:</div>

            {/* Tên sản phẩm */}
            <LabeledInputField
              value={newProductInfo.name}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  name: e.target.value,
                })
              }
              label="Tên sản phẩm"
              placeholder="Chuột Logitech"
            />

            {/* Loại */}
            <div className="flex items-center">
              <div className="w-[180px]">
                <strong>Loại: </strong>
              </div>
              <SelectButton
                value={newProductInfo.category_id}
                onChange={(e: any) => {
                  setSelectedType(e.target.value);
                  setNewProductInfo({
                    ...newProductInfo,
                    category_id: e.target.value,
                  });
                }}
                width="w-1/2"
                dataset={types}
              />
            </div>

            {/* Hãng */}
            <LabeledInputField
              value={newProductInfo.brand_id}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  brand_id: e.target.value,
                })
              }
              label="Hãng"
              placeholder="Logitech"
            />

            {/* Giá gốc */}
            <LabeledInputField
              value={String(newProductInfo.importPrice)}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  importPrice: parseFloat(e.target.value) || 0,
                })
              }
              label="Giá gốc: "
              placeholder="400000"
            />

            {/* Giá bán */}
            <LabeledInputField
              value={String(newProductInfo.price)}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              label="Giá bán: "
              placeholder="500000"
            />

            {/* Mô tả 1 */}
            <LabeledInputField
              value={newProductInfo.description1}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  description1: e.target.value,
                })
              }
              label="Mô tả 1: "
              placeholder="..."
            />

            {/* Mô tả 2 */}
            <LabeledInputField
              value={newProductInfo.description2}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  description2: e.target.value,
                })
              }
              label="Mô tả 2: "
              placeholder="..."
            />

            {/* Mô tả 3 */}
            <LabeledInputField
              value={newProductInfo.description3}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  description3: e.target.value,
                })
              }
              label="Mô tả 3: "
              placeholder="..."
            />
          </div>
          {/* Right */}
          <div className="flex flex-col gap-[var(--medium-gap)] pl-[var(--big-gap)] ">
            <div>Thông số kĩ thuật:</div>

            {/* Pin */}
            <LabeledInputField
              value={newProductInfo.battery}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  battery: e.target.value,
                })
              }
              label="Pin: "
              placeholder="1000"
            />

            {/* Bảo hành */}
            <LabeledInputField
              value={newProductInfo.warranty}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  warranty: e.target.value,
                })
              }
              label="Bảo hành: "
              placeholder="7 years"
            />

            {/* Loại kết nối */}
            <LabeledInputField
              value={newProductInfo.connectionType}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  connectionType: e.target.value,
                })
              }
              label="Loại kết nối: "
              placeholder="wireless"
            />

            {/* Màu */}
            <LabeledInputField
              value={newProductInfo.color}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  color: e.target.value,
                })
              }
              label="Màu: "
              placeholder="red"
            />

            {/* Led */}
            <LabeledInputField
              value={String(newProductInfo.led)}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  led: e.target.value === "true",
                })
              }
              label="Led: "
              placeholder="1: Có/ 0: Không"
            />

            {/* Trọng lượng */}
            <LabeledInputField
              value={String(newProductInfo.weight)}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  weight: parseFloat(e.target.value) || 0,
                })
              }
              label="Trọng lượng: "
              placeholder="1 (gram)"
            />

            {selectedType === "mouse" && (
              <div className="flex flex-col gap-[var(--medium-gap)]">
                {/* Max DPI */}
                <LabeledInputField
                  value={String(newProductInfo.maxDpi)}
                  onChange={(e: any) =>
                    setNewProductInfo({
                      ...newProductInfo,
                      maxDpi: parseFloat(e.target.value) || 0,
                    })
                  }
                  label="Max DPI: "
                  placeholder="1600"
                />
              </div>
            )}
            {selectedType === "keyboard" && (
              <div className="flex flex-col gap-[var(--medium-gap)]">
                {/* Có phím số */}
                <LabeledInputField
                  value={String(newProductInfo.numKeys)}
                  onChange={(e: any) =>
                    setNewProductInfo({
                      ...newProductInfo,
                      numKeys: parseInt(e.target.value) || 0,
                    })
                  }
                  label="Có phím số: "
                  placeholder="100"
                />

                {/* Loại switch */}
                <LabeledInputField
                  value={newProductInfo.switchType || ""}
                  onChange={(e: any) =>
                    setNewProductInfo({
                      ...newProductInfo,
                      switchType: e.target.value,
                    })
                  }
                  label="Loại switch: "
                  placeholder="..."
                />
              </div>
            )}
            {selectedType === "headphone" && (
              <div className="flex flex-col gap-[var(--medium-gap)]">
                {/* Có mic */}
                <LabeledInputField
                  value={String(newProductInfo.hasMic)}
                  onChange={(e: any) =>
                    setNewProductInfo({
                      ...newProductInfo,
                      hasMic: e.target.value === "true",
                    })
                  }
                  label="Có mic: "
                  placeholder="1: Có/ 0: Không"
                />

                {/* Khử tiếng ồn */}
                <LabeledInputField
                  value={String(newProductInfo.noiseCancelling)}
                  onChange={(e: any) =>
                    setNewProductInfo({
                      ...newProductInfo,
                      noiseCancelling: e.target.value === "true",
                    })
                  }
                  label="Khử tiếng ồn: "
                  placeholder="1: Có/ 0: Không"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[var(--medium-gap)]">
          {/* Thêm ảnh */}
          {/* Cần imageURLs để giải phóng bộ nhớ tạm chứ URL sau khi đã thêm xong tại ImportImage */}
          {/* setImageURLs và imageURLs để hiển thị tạm các hình dạng vuông nhỏ ngay dưới Popup */}
          {/* setFiles để lấy files ảnh đã lưu trong ImportImage để truyền vào files, sau đó truyền vào handleCreateProduct */}
          <ImportImage
            imageURLs={imageURLs}
            setImageURLs={setImageURLs}
            setFiles={setFiles}
          />

          <div className="flex gap-[var(--small-gap)]">
            {/* handleCreateProduct nhận vào files là danh sách các ảnh để lưu về backend */}
            {/* newProductInfo: lấy các thông tin đã được nhập từ trang Popup truyền về backend */}
            {/* setNewProductInfo: sau khi gọi API thêm được sản phẩm xong, set các trường của thông tin sản phẩm về mặc định là các chuỗi rỗng */}
            {/* setProducts: dùng để cập nhật "ngay lập tức" danh sách sản phẩm, thêm sản phẩm vừa được thêm vào ngay mà không cần load lại trang */}

            <Button
              onClick={() =>
                handleCreateProduct(
                  "http://localhost:8020/api/v1/gmshop/product/create-product",
                  files,
                  newProductInfo,
                  setNewProductInfo,
                  setProducts
                )
              }
              type="submit"
              text="Lưu"
            />
            <CancelButton
              onClick={() =>
                handleCancelCreate(setShowPopup, setNewProductInfo)
              }
              text="Hủy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupProduct;
