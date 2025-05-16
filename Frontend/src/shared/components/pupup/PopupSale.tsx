import { LabeledInputField } from "../form";
import { handleCreate, handleCancelCreate } from "../../../service/crudService";
import { Button, CancelButton } from "../../components/button";
import { Line } from "../ui";

import { useState } from "react";
import { InputField } from "../form";

interface PopupProductProps {
  setSales: React.Dispatch<React.SetStateAction<any>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupSale = ({ setSales, setShowPopup }: PopupProductProps) => {
  const [newSaleInfo, setNewSaleInfo] = useState({
    name: "",
    type: "",
    state: "",
    startDate: "",
    endDate: "",
    products: "",
  });

  const [newSale, setNewSale] = useState<any>({});

  return (
    <div className="fixed z-49 inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        <div>Thông tin đợt khuyến mãi:</div>

        {/* Tên chương trình */}
        <LabeledInputField
          value={newSaleInfo.name}
          onChange={(e: any) =>
            setNewSaleInfo({
              ...newSaleInfo,
              name: e.target.value,
            })
          }
          label="Tên chương trình: "
          placeholder="Black Friday"
          width="w-[240px]"
        />

        {/* Loại khuyến mãi */}
        <LabeledInputField
          value={newSaleInfo.type}
          onChange={(e: any) =>
            setNewSaleInfo({
              ...newSaleInfo,
              type: e.target.value,
            })
          }
          label="Loại khuyến mãi: "
          placeholder="Giảm theo %"
          width="w-[240px]"
        />

        {/* Từ ngày */}
        <LabeledInputField
          value={newSaleInfo.startDate}
          onChange={(e: any) =>
            setNewSaleInfo({
              ...newSaleInfo,
              startDate: e.target.value,
            })
          }
          label="Từ ngày: "
          placeholder="01/01/2024"
          width="w-[240px]"
        />

        {/* Đến ngày */}
        <LabeledInputField
          value={newSaleInfo.endDate}
          onChange={(e: any) =>
            setNewSaleInfo({
              ...newSaleInfo,
              endDate: e.target.value,
            })
          }
          label="Đến ngày: "
          placeholder="01/02/2024"
          width="w-[240px]"
        />

        <Line />
        {/* Thêm các sản phẩm áp dụng cho đợt khuyến mãi */}
        <div className="flex">
          <div className="w-[180px] flex flex-col gap-[var(--small-gap)]">
            <strong>Thêm sản phẩm: </strong>
            <div>
              <Button text="Thêm" type="button" />
            </div>
          </div>
          <div className="w-[240px] flex flex-col gap-[var(--small-gap)]">
            <InputField placeholder="Tên sản phẩm" type="text" />
            <InputField placeholder="Link sản phẩm" type="text" />
            <InputField placeholder="Giảm ... %" type="text" />
          </div>
        </div>
        <Line />

        {/* Hiển thị các sản phẩm áp dụng cho đợt khuyến mãi */}
        <div className="flex items-center">
          <div className="flex flex-col gap-[var(--medium-gap)] w-[180px]">
            <div className="pr-[var(--medium-gap)]">
              <strong>Danh sách các sản phẩm được áp dụng:</strong>{" "}
            </div>
          </div>
          <div className="rounded-md border border-[var(--secondary-color)] w-[240px]">
            Các sản phẩm được áp dụng
          </div>
        </div>

        <div className="flex gap-[var(--small-gap)]">
          <Button
            onClick={() =>
              handleCreate(
                "http://localhost:8080/sale/create",
                newSale,
                setSales,
                setNewSale
              )
            }
            type="submit"
            text="Lưu"
          />
          <CancelButton
            onClick={() => handleCancelCreate(setShowPopup, setNewSale)}
            text="Hủy"
          />
        </div>
      </div>
    </div>
  );
};

export default PopupSale;
