import { LabeledInputField } from "../../../shared/components/form";
import {
  handleModifyProduct,
  handleCancelModify,
} from "../../../service/crudService";
import { Button, CancelButton } from "../../../shared/components/button";
import ImportImage from "../../utils/ImportImage";

import { useState, useEffect } from "react";

interface ProductProps {
  product: any;
  setProducts: React.Dispatch<React.SetStateAction<any>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupProductModify = ({
  product,
  setProducts,
  setShowPopup,
}: ProductProps) => {
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: 0.0,
    battery: "",
    warranty: "",
    connectionType: "",
    weight: 0.0,
    brand_id: "",
    color: "",
    led: 0,
    maxDpi: 0,
    hasMic: 0,
    noiseCancelling: 0,
    numKeys: 0,
    switchType: "",
    stock_quantity: 0,
    category_id: "mouse",
    importPrice: 0.0,
    description1: "",
    description2: "",
    description3: "",
  });

  useEffect(() => {
    if (!product) return;

    setProductInfo({
      name: product.name,
      price: product.price || 0.0,
      battery: product.specs?.battery || "",
      warranty: product.specs?.warranty || "",
      connectionType: product.specs.connectionType || "",
      weight: product.specs.weight || 0.0,
      brand_id: product.brand_id || "",
      color: product.specs.color || "",
      led: product.specs.led ? 1 : 0,
      maxDpi: product.specs.maxDpi || 0,
      hasMic: product.specs.hasMic ? 1 : 0,
      noiseCancelling: product.specs.noiseCancelling ? 1 : 0,
      numKeys: product.specs.numKeys || 0,
      switchType: product.specs.switchType || "",
      stock_quantity: product.stock_quantity || 0,
      category_id: product.category_id || "mouse",
      importPrice: product.originPrice || 0.0,
      description1: product.description_1,
      description2: product.description_2,
      description3: product.description_3,
    });
  }, [product]);

  return (
    <div className="fixed z-49 inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="overflow-auto rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="flex flex-col gap-[var(--big-gap)]">
            <div className="flex gap-[var(--big-gap)]">
              <div className="flex flex-col gap-[var(--medium-gap)]">
                <div>Thông tin sản phẩm:</div>
                {/* Giá gốc */}
                <LabeledInputField
                  value={String(productInfo.importPrice) || ""}
                  onChange={(e: any) =>
                    setProductInfo({
                      ...productInfo,
                      importPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  label="Giá gốc: "
                  placeholder="100000"
                  inputFieldWidth="w-[240px]"
                />
                {/* Giá bán */}
                <LabeledInputField
                  value={String(productInfo.price) || ""}
                  onChange={(e: any) =>
                    setProductInfo({
                      ...productInfo,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  label="Giá bán: "
                  placeholder="100000"
                  inputFieldWidth="w-[240px]"
                />
                {/* Mô tả 1 */}
                <LabeledInputField
                  value={productInfo.description1 || ""}
                  onChange={(e: any) =>
                    setProductInfo({
                      ...productInfo,
                      description1: e.target.value,
                    })
                  }
                  label="Mô tả 1: "
                  placeholder="..."
                  inputFieldWidth="w-[240px]"
                />
                {/* Mô tả 2 */}
                <LabeledInputField
                  value={productInfo.description2 || ""}
                  onChange={(e: any) =>
                    setProductInfo({
                      ...productInfo,
                      description1: e.target.value,
                    })
                  }
                  label="Mô tả 2: "
                  placeholder="..."
                  inputFieldWidth="w-[240px]"
                />
                {/* Mô tả 3 */}
                <LabeledInputField
                  value={productInfo.description3 || ""}
                  onChange={(e: any) =>
                    setProductInfo({
                      ...productInfo,
                      description1: e.target.value,
                    })
                  }
                  label="Mô tả 3: "
                  placeholder="..."
                  inputFieldWidth="w-[240px]"
                />
              </div>
              <div className="flex flex-col gap-[var(--medium-gap)]">
                <div>Thông số kỹ thuật: </div>
                {/* Pin */}
                <LabeledInputField
                  value={productInfo.battery || ""}
                  onChange={(e: any) =>
                    setProductInfo({
                      ...productInfo,
                      battery: e.target.value,
                    })
                  }
                  label="Pin: "
                  placeholder="1000"
                  inputFieldWidth="w-[240px]"
                />
                {/* Bảo hành */}
                <LabeledInputField
                  value={productInfo.warranty || ""}
                  onChange={(e: any) =>
                    setProductInfo({
                      ...productInfo,
                      warranty: e.target.value,
                    })
                  }
                  label="Bảo hành: "
                  placeholder="7 years"
                  inputFieldWidth="w-[240px]"
                />
                {/* Loại kết nối */}
                <LabeledInputField
                  value={productInfo.connectionType || ""}
                  onChange={(e: any) =>
                    setProductInfo({
                      ...productInfo,
                      connectionType: e.target.value,
                    })
                  }
                  label="Loại kết nối: "
                  placeholder="7 years"
                  inputFieldWidth="w-[240px]"
                />
                {/* Màu */}
                <LabeledInputField
                  value={productInfo.color || ""}
                  onChange={(e: any) =>
                    setProductInfo({
                      ...productInfo,
                      color: e.target.value,
                    })
                  }
                  label="Màu: "
                  placeholder="Đen"
                  inputFieldWidth="w-[240px]"
                />
                {/* Led */}
                <LabeledInputField
                  value={String(productInfo.led) || ""}
                  onChange={(e: any) =>
                    setProductInfo({
                      ...productInfo,
                      led: parseInt(e.target.value) || 0,
                    })
                  }
                  label="Led: "
                  placeholder="1: Có/ 0: Không"
                  inputFieldWidth="w-[240px]"
                />
                {/* Trọng lượng */}
                <LabeledInputField
                  value={String(productInfo.weight) || ""}
                  onChange={(e: any) =>
                    setProductInfo({
                      ...productInfo,
                      weight: parseFloat(e.target.value) || 0,
                    })
                  }
                  label="Trọng lượng: "
                  placeholder="1: Có/ 0: Không"
                  inputFieldWidth="w-[240px]"
                />
                {product.category_id === "mouse" && (
                  <>
                    {/* Max DPI */}
                    <LabeledInputField
                      value={String(productInfo.maxDpi) || ""}
                      onChange={(e: any) =>
                        setProductInfo({
                          ...productInfo,
                          maxDpi: parseFloat(e.target.value) || 0,
                        })
                      }
                      label="Max DPI: "
                      placeholder="1600"
                      inputFieldWidth="w-[240px]"
                    />
                  </>
                )}
                {product.category_id === "keyboard" && (
                  <>
                    {/* Số lượng phím */}
                    <LabeledInputField
                      value={String(productInfo.numKeys) || ""}
                      onChange={(e: any) =>
                        setProductInfo({
                          ...productInfo,
                          numKeys: parseFloat(e.target.value) || 0,
                        })
                      }
                      label="Số lượng phím: "
                      placeholder="100"
                      inputFieldWidth="w-[240px]"
                    />
                    {/* Loại switch */}
                    <LabeledInputField
                      value={productInfo.switchType || ""}
                      onChange={(e: any) =>
                        setProductInfo({
                          ...productInfo,
                          switchType: e.target.value,
                        })
                      }
                      label="Loại switch: "
                      placeholder="100"
                      inputFieldWidth="w-[240px]"
                    />
                  </>
                )}
                {product.category_id === "headphone" && (
                  <>
                    {/* Có mic */}
                    <LabeledInputField
                      value={String(productInfo.hasMic)}
                      onChange={(e: any) =>
                        setProductInfo({
                          ...productInfo,
                          hasMic: parseInt(e.target.value) || 0,
                        })
                      }
                      label="Có mic: "
                      placeholder="1: Có/ 0: Không"
                    />
                    {/* Khử tiếng ồn */}
                    <LabeledInputField
                      value={String(productInfo.noiseCancelling)}
                      onChange={(e: any) =>
                        setProductInfo({
                          ...productInfo,
                          noiseCancelling: parseInt(e.target.value) || 0,
                        })
                      }
                      label="Khử tiếng ồn: "
                      placeholder="1: Có/ 0: Không"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Thêm ảnh */}
            {/* Cần imageURLs để giải phóng bộ nhớ tạm chứ URL sau khi đã thêm xong tại ImportImage */}
            {/* setImageURLs và imageURLs để hiển thị tạm các hình dạng vuông nhỏ ngay dưới Popup */}
            {/* setFiles để lấy files ảnh đã lưu trong ImportImage để truyền vào files, sau đó truyền vào handleCreateProduct */}
            <ImportImage
              imageURLs={imageURLs}
              setImageURLs={setImageURLs}
              setFiles={setFiles}
            />
          </div>

          <div className="flex flex-col gap-[var(--medium-gap)]">
            <div className="flex gap-[var(--small-gap)]">
              <Button
                onClick={() =>
                  handleModifyProduct(
                    "http://localhost:8020/api/v1/gmshop/product/",
                    product.id,
                    files,
                    productInfo,
                    setProductInfo,
                    setProducts
                  )
                }
                type="button"
                text="Lưu"
              />
              <CancelButton
                onClick={() =>
                  handleCancelModify(setShowPopup, setProductInfo, product)
                }
                text="Hủy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupProductModify;
