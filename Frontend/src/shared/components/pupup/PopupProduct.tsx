import { LabeledInputField } from "../form/LabeledInputField";
import { handleCreate, handleCancelCreate } from "../../../service/crudService";
import { SelectButton } from "../../components/form";
import { Button, CancelButton } from "../../components/button";

import { useState, useEffect } from "react";

interface PopupProductProps {
  setProducts: React.Dispatch<React.SetStateAction<any>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupProduct = ({ setProducts, setShowPopup }: PopupProductProps) => {
  const types = ["Chuột", "Bàn phím", "Tai nghe"];
  const [selectedType, setSelectedType] = useState<string>("");

  // State quản lý thông tin sản phẩm
  const [newProductInfo, setNewProductInfo] = useState({
    name: "",
    amount: "",
    company: "",
    importPrice: "",
    sellPrice: "",
    state: "",
    type: "",
    battery: "",
    warranty: "",
    connectionType: "",
    color: "",
    led: "",
    weight: "",
  });

  // State quản lý thông số kỹ thuật đặc thù
  const [specificInfo, setSpecificInfo] = useState<any>({});
  const [newProduct, setNewProduct] = useState<any>({});

  // Reset specificInfo khi loại sản phẩm thay đổi
  useEffect(() => {
    const type = newProductInfo.type;
    switch (type) {
      case "Chuột":
        setSpecificInfo({ maxDpi: "" });
        break;
      case "Bàn phím":
        setSpecificInfo({ numkeys: "", switchType: "" });
        break;
      case "Tai nghe":
        setSpecificInfo({ hasMic: "", noiseCancelling: "" });
        break;
      default:
        setSpecificInfo({});
    }
  }, [newProductInfo.type]);

  // Cập nhật newProduct khi thông tin thay đổi
  useEffect(() => {
    setNewProduct({
      ...newProductInfo,
      ...specificInfo,
    });
  }, [newProductInfo, specificInfo]);

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
                value={newProductInfo.type}
                onChange={(e: any) => {
                  setSelectedType(e.target.value);
                  setNewProductInfo({
                    ...newProductInfo,
                    type: e.target.value,
                  });
                }}
                width="w-1/2"
                dataset={types}
              />
            </div>

            {/* Hãng */}
            <LabeledInputField
              value={newProductInfo.company}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  company: e.target.value,
                })
              }
              label="Hãng"
              placeholder="Logitech"
            />

            {/* Giá gốc */}
            <LabeledInputField
              value={newProductInfo.importPrice}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  importPrice: e.target.value,
                })
              }
              label="Giá gốc: "
              placeholder="400000đ"
            />

            {/* Giá bán */}
            <LabeledInputField
              value={newProductInfo.sellPrice}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  sellPrice: e.target.value,
                })
              }
              label="Giá bán: "
              placeholder="500000đ"
            />
          </div>
          {/* Right */}
          <div className="flex flex-col gap-[var(--medium-gap)] pl-[var(--big-gap)] ">
            <div>Thông số kĩ thuật:</div>

            {/* Giá bán */}
            <LabeledInputField
              value={newProductInfo.battery}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  battery: e.target.value,
                })
              }
              label="Pin: "
              placeholder="..."
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
              placeholder="..."
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
              placeholder="..."
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
              placeholder="..."
            />

            {/* Led */}
            <LabeledInputField
              value={newProductInfo.led}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  led: e.target.value,
                })
              }
              label="Led: "
              placeholder="..."
            />

            {/* Trọng lượng */}
            <LabeledInputField
              value={newProductInfo.weight}
              onChange={(e: any) =>
                setNewProductInfo({
                  ...newProductInfo,
                  weight: e.target.value,
                })
              }
              label="Trọng lượng: "
              placeholder="..."
            />

            {selectedType === "Chuột" && (
              <div className="flex flex-col gap-[var(--medium-gap)]">
                {/* Max DPI */}
                <LabeledInputField
                  value={specificInfo.maxDpi || ""}
                  onChange={(e: any) =>
                    setSpecificInfo({
                      ...specificInfo,
                      maxDpi: e.target.value,
                    })
                  }
                  label="Max DPI: "
                  placeholder="..."
                />
              </div>
            )}
            {selectedType === "Bàn phím" && (
              <div className="flex flex-col gap-[var(--medium-gap)]">
                {/* Có phím số */}
                <LabeledInputField
                  value={specificInfo.numkeys || ""}
                  onChange={(e: any) =>
                    setSpecificInfo({
                      ...specificInfo,
                      numkeys: e.target.value,
                    })
                  }
                  label="Có phím số: "
                  placeholder="..."
                />

                {/* Loại switch */}
                <LabeledInputField
                  value={specificInfo.switchType || ""}
                  onChange={(e: any) =>
                    setSpecificInfo({
                      ...specificInfo,
                      switchType: e.target.value,
                    })
                  }
                  label="Loại switch: "
                  placeholder="..."
                />
              </div>
            )}
            {selectedType === "Tai nghe" && (
              <div className="flex flex-col gap-[var(--medium-gap)]">
                {/* Có mic */}
                <LabeledInputField
                  value={specificInfo.hasMic || ""}
                  onChange={(e: any) =>
                    setSpecificInfo({
                      ...specificInfo,
                      hasMic: e.target.value,
                    })
                  }
                  label="Có mic: "
                  placeholder="..."
                />

                {/* Khử tiếng ồn */}
                <LabeledInputField
                  value={specificInfo.noiseCancelling || ""}
                  onChange={(e: any) =>
                    setSpecificInfo({
                      ...specificInfo,
                      noiseCancelling: e.target.value,
                    })
                  }
                  label="Khử tiếng ồn: "
                  placeholder="..."
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[var(--medium-gap)]">
          {/* Thêm ảnh */}
          <div>
            <Button type="button" text="Thêm ảnh" />
          </div>
          <div className="flex gap-[var(--small-gap)]">
            <Button
              onClick={() =>
                handleCreate(
                  "http://localhost:8080/product/create",
                  newProduct,
                  setProducts,
                  setNewProduct
                )
              }
              type="submit"
              text="Lưu"
            />
            <CancelButton
              onClick={() => handleCancelCreate(setShowPopup, setNewProduct)}
              text="Hủy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupProduct;
