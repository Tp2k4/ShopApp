import ManagerLayout from "../shared/layout/ManagerLayout";
import Box from "../shared/components/ui/Box";
import Button from "../shared/components/button/Button";
import FilterButton from "../shared/components/form/FilterButton";
import SearchField from "../shared/components/form/SearchField";
import SaleList from "../shared/components/list/SaleList";

import { useEffect, useState } from "react";
import InputField from "../shared/components/form/InputField";
import CancelButton from "../shared/components/button/CancelButton";

function Account() {
  const [sales, setSales] = useState<any[]>([]);
  let filter = ["Tất cả", "Ngày", "Tháng", "Năm"];

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch("/database/sale.json")
      .then((res) => res.json())
      .then((data) => setSales(data))
      .catch((err) => console.error("Lỗi khi fetch json:", err));
  }, []);

  return (
    <ManagerLayout>
      <Box className="" height="100%" width="100%">
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ KHUYẾN MÃI
        </div>

        {/* */}
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className="px-[var(--medium-gap)] flex items-center justify-between w-full">
            <Button
              onClick={() => setShowPopup(true)}
              type="button"
              text="Thêm khuyến mãi"
              width="auto"
            />
            <div className="flex items-center gap-[var(--small-gap)]">
              <FilterButton filter={filter} text="Tất cả" />
              <SearchField width="300px" />
            </div>
          </div>

          <SaleList sales={sales} />
        </div>
      </Box>

      {/* Popup Screen */}
      {showPopup && (
        <div className="fixed z-49 inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-70"></div>

          <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
            <div className="flex items-center">
              <div className="w-1/2">
                <strong>Tên chương trình: </strong>
              </div>
              <InputField
                width="w-1/2"
                type="text"
                placeholder="Black Friday..."
              />
            </div>
            <div className="flex items-center">
              <div className="w-1/2">
                <strong>Loại khuyến mãi: </strong>
              </div>
              <InputField
                width="w-1/2"
                type="text"
                placeholder="Giảm theo %..."
              />
            </div>
            <div className="flex flex-col gap-[var(--small-gap)]">
              <div className="flex items-center">
                <div className="w-1/2">
                  <strong>Từ ngày: </strong>
                </div>
                <InputField
                  width="w-1/2"
                  type="text"
                  placeholder="01/01/2024"
                />
              </div>
              <div className="flex items-center">
                <div className="w-1/2">
                  <strong>Đến ngày: </strong>
                </div>
                <InputField
                  width="w-1/2"
                  type="text"
                  placeholder="30/01/2024"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[var(--small-gap)]">
              <div className="flex">
                <div className="w-1/2">
                  <strong>Thêm sản phẩm: </strong>
                </div>
                <InputField
                  width="w-1/2"
                  type="text"
                  placeholder="Thêm sản phẩm"
                />
              </div>
              <div className="flex">
                <div className="w-1/2">
                  <Button text="Thêm" type="button" />
                </div>
                <InputField
                  width="w-1/2"
                  type="text"
                  placeholder="Link sản phẩm"
                />
              </div>
              <div className="flex">
                <div className="w-1/2"></div>
                <InputField width="w-1/2" type="text" placeholder="30%" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col gap-[var(--medium-gap)] w-1/2">
                <div>
                  <strong>Danh sách các sản phẩm được áp dụng:</strong>{" "}
                </div>
                <div className="flex gap-[var(--small-gap)]">
                  <Button type="submit" text="Lưu" />
                  <CancelButton
                    onClick={() => setShowPopup(false)}
                    text="Hủy"
                  />
                </div>
              </div>
              <div className="rounded-md border border-[var(--secondary-color)] w-1/2">
                Các sản phẩm được áp dụng
              </div>
            </div>
          </div>
        </div>
      )}
    </ManagerLayout>
  );
}

export default Account;
