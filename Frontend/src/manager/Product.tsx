import ManagerLayout from "../shared/layout/ManagerLayout";
import Box from "../shared/components/ui/Box";
import Button from "../shared/components/button/Button";
import FilterButton from "../shared/components/form/FilterButton";
import SearchField from "../shared/components/form/SearchField";
import ProductList from "../shared/components/list/ProductList";
import InputField from "../shared/components/form/InputField";
import SelectButton from "../shared/components/form/SelectButton";

import { useEffect, useState } from "react";
import CancelButton from "../shared/components/button/CancelButton";

function Product() {
  const [products, setProducts] = useState<any[]>([]);
  const filter = ["Tất cả", "Chuột", "Bàn phím", "Tai nghe"];

  const types = ["Chuột", "Bàn phím", "Tai nghe"];
  const [selectedType, setSelectedType] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch("/database/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi khi fetch json:", err));
  }, []);

  return (
    <ManagerLayout>
      <Box className="" height="100%" width="100%">
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ SẢN PHẨM
        </div>

        {/* */}
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="px-[var(--medium-gap)] flex items-center justify-between w-full">
            <Button
              onClick={() => setShowPopup(true)}
              type="button"
              text="Thêm sản phẩm"
              width="auto"
            />
            <div className="flex items-center gap-[var(--small-gap)]">
              <FilterButton filter={filter} />
              <SearchField width="300px" />
            </div>
          </div>

          <ProductList products={products} />
        </div>
      </Box>

      {/* Popup Screen */}
      {showPopup && (
        <div className="fixed z-49 inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-70"></div>

          <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
            {/* Info */}
            <div className="flex">
              {/* Left */}
              <div className="pr-[var(--medium-gap)] flex flex-col gap-[var(--medium-gap)]">
                <div>Thông tin sản phẩm:</div>
                <div className="flex items-center">
                  <div className="w-1/2">
                    <strong>Tên sản phẩm: </strong>
                  </div>
                  <InputField width="w-1/2" type="text" placeholder="Chuột A" />
                </div>
                <div className="flex items-center">
                  <div className="w-1/2">
                    <strong>Loại: </strong>
                  </div>
                  <SelectButton
                    onChange={(event: any) =>
                      setSelectedType(event.target.value)
                    }
                    width="w-1/2"
                    dataset={types}
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-1/2">
                    <strong>Hãng: </strong>
                  </div>
                  <SelectButton width="w-1/2" dataset={types} />
                </div>
                <div className="flex items-center">
                  <div className="w-1/2">
                    <strong>Giá gốc: </strong>
                  </div>
                  <InputField width="w-1/2" placeholder="400000đ" type="text" />
                </div>
                <div className="flex items-center">
                  <div className="w-1/2">
                    <strong>Giá bán: </strong>
                  </div>
                  <InputField width="w-1/2" placeholder="500000đ" type="text" />
                </div>
              </div>
              {/* Right */}
              <div className="flex flex-col gap-[var(--medium-gap)] pl-[var(--medium-gap)] border-l border-[var(--line-color)]">
                <div>Thông số kĩ thuật:</div>
                <div className="flex items-center">
                  <div className="w-1/2">
                    <strong>Pin: </strong>
                  </div>
                  <InputField width="w-1/2" placeholder="..." type="text" />
                </div>
                <div className="flex items-center">
                  <div className="w-1/2">
                    <strong>Bảo hành: </strong>
                  </div>
                  <InputField width="w-1/2" placeholder="..." type="text" />
                </div>
                <div className="flex items-center">
                  <div className="w-1/2">
                    <strong>Loại kết nối: </strong>
                  </div>
                  <InputField width="w-1/2" placeholder="..." type="text" />
                </div>
                <div className="flex items-center">
                  <div className="w-1/2">
                    <strong>Màu: </strong>
                  </div>
                  <InputField width="w-1/2" placeholder="..." type="text" />
                </div>
                <div className="flex items-center">
                  <div className="w-1/2">
                    <strong>Led: </strong>
                  </div>
                  <InputField width="w-1/2" placeholder="..." type="text" />
                </div>
                <div className="flex items-center">
                  <div className="w-1/2">
                    <strong>Trọng lượng: </strong>
                  </div>
                  <InputField width="w-1/2" placeholder="..." type="text" />
                </div>
                {selectedType === "Chuột" && (
                  <div className="flex flex-col gap-[var(--medium-gap)]">
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <strong>Max DPI: </strong>
                      </div>
                      <InputField width="w-1/2" placeholder="..." type="text" />
                    </div>
                  </div>
                )}
                {selectedType === "Bàn phím" && (
                  <div className="flex flex-col gap-[var(--medium-gap)]">
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <strong>Có phím số: </strong>
                      </div>
                      <InputField width="w-1/2" placeholder="..." type="text" />
                    </div>
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <strong>Loại switch: </strong>
                      </div>
                      <InputField width="w-1/2" placeholder="..." type="text" />
                    </div>
                  </div>
                )}
                {selectedType === "Tai nghe" && (
                  <div className="flex flex-col gap-[var(--medium-gap)]">
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <strong>Có mic: </strong>
                      </div>
                      <InputField width="w-1/2" placeholder="..." type="text" />
                    </div>
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <strong>Khử tiếng ồn: </strong>
                      </div>
                      <InputField width="w-1/2" placeholder="..." type="text" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thêm ảnh */}

            <div className="flex flex-col gap-[var(--medium-gap)]">
              <div>
                <Button type="button" text="Thêm ảnh" />
              </div>
              <div className="flex gap-[var(--small-gap)]">
                <Button type="submit" text="Lưu" />
                <CancelButton onClick={() => setShowPopup(false)} text="Hủy" />
              </div>
            </div>
          </div>
        </div>
      )}
    </ManagerLayout>
  );
}

export default Product;
