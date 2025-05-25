import { LabeledInputField, InputField, SelectButton } from "../../../shared/components/form";
import { handleCreateSale, handleCancelCreate, useGet } from "../../../service/crudService";
import { Button, CancelButton } from "../../../shared/components/button";
import { Line } from "../../../shared/components/ui";
import ImportImage from "../../utils/ImportImage";

import { useState, useEffect } from "react";

interface PopupProductProps {
  setSales: React.Dispatch<React.SetStateAction<any>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupSale = ({ setSales, setShowPopup }: PopupProductProps) => {
  // Thêm ảnh
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  // Gọi API để lấy danh sách sản phẩm
  const { data: productList } = useGet(
    "http://localhost:8020/api/v1/gmshop/product/admin/product-name-list"
  );
  // Lấy danh sách "tên" sản phẩm từ API
  const [productListName, setProductListName] = useState<String[]>([]);
  useEffect(() => {
    if (productList.length > 0) {
      const names = productList.map((product: any) => product.productName);
      setProductListName(names);
    }
  }, [productList]);

  // Khai báo kiểu cho những sản phẩm sẽ được thêm vào đợt khuyến mãi
  interface ProductSaleInfo{
    product_id: string;
    discount_percent: number
  }
  const [productSaleInfo, setProductSaleInfo] = useState<ProductSaleInfo>({
    product_id: "",
    discount_percent: 0
  });

  // Thông tin khuyến mãi
  interface newSaleInfo {
    name: string;
    type: string,
    start_date: string,
    end_date: string,
    list_product: ProductSaleInfo[],
  }
  const [newSaleInfo, setNewSaleInfo] = useState<newSaleInfo>({
    name: "",
    type: "",
    start_date: "",
    end_date: "",
    list_product: [],
  });

  const handleAddNewProductSale = () => {
    setNewSaleInfo(prev => ({
      ...prev,
      list_product: [...prev.list_product, productSaleInfo]
    }));
  }

  return (
    <div className="fixed z-49 inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        
        <div className="flex gap-[var(--big-gap)]">
          <div className="flex flex-col gap-[var(--medium-gap)]">
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
              inputFieldWidth="w-[240px]"
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
              inputFieldWidth="w-[240px]"
            />

            {/* Từ ngày */}
            <LabeledInputField
              value={newSaleInfo.start_date}
              onChange={(e: any) =>
                setNewSaleInfo({
                  ...newSaleInfo,
                  start_date: e.target.value,
                })
              }
              label="Từ ngày: "
              placeholder="2024-01-01"
              inputFieldWidth="w-[240px]"
            />

            {/* Đến ngày */}
            <LabeledInputField
              value={newSaleInfo.end_date}
              onChange={(e: any) =>
                setNewSaleInfo({
                  ...newSaleInfo,
                  end_date: e.target.value,
                })
              }
              label="Đến ngày: "
              placeholder="2024-01-30"
              inputFieldWidth="w-[240px]"
            />
          </div>
          
          <div className="flex flex-col gap-[var(--medium-gap)]">
            {/* Thêm các sản phẩm áp dụng cho đợt khuyến mãi */}
            <div>Thêm sản phẩm cho đợt khuyến mãi:</div>
            <div className="flex flex-col gap-[var(--medium-gap)]">
              
              {/* Sản phẩm */}
              <div className="flex">
                <div className="w-[180px] flex flex-col justify-center gap-[var(--small-gap)]">
                  <strong>Sản phẩm: </strong>
                </div>
                <SelectButton
                  value={productSaleInfo.product_id}
                  onChange={(e: any) => {
                    setProductSaleInfo({
                      ...productSaleInfo,
                      product_id: e.target.value,
                    });
                  }}
                  width="w-[240px]"
                  dataset={productListName}
                />
              </div>
               
              {/* Giảm */}
              <div className="flex">
                <div className="w-[180px] flex flex-col justify-center gap-[var(--small-gap)]">
                  <strong>Giảm: </strong>
                </div>
                <InputField 
                  value={String(productSaleInfo.discount_percent)} 
                  onChange={(e: any) => {
                    setProductSaleInfo({
                      ...productSaleInfo,
                      discount_percent: parseInt(e.target.value) || 0,
                    });
                  }} 
                  placeholder="Giảm ... %" type="text" 
                  className="w-[240px]"

                />
              </div>

              <div>
                  <Button onClick={()=>handleAddNewProductSale()} text="Thêm" type="button" />
              </div>
            </div>

            {/* Hiển thị các sản phẩm áp dụng cho đợt khuyến mãi */}
            <div className="flex">
              <div className="flex flex-col gap-[var(--medium-gap)] w-[180px]">
                <div className="pr-[var(--medium-gap)]">
                  <strong>Danh sách các sản phẩm được áp dụng:</strong>{" "}
                </div>
              </div>
              <div className="p-[var(--small-gap)] min-h-[96px] rounded-md border border-[var(--secondary-color)] w-[240px]">
                {Array.isArray(newSaleInfo.list_product) &&
                  newSaleInfo.list_product.map((productSaleInfo, index) => (
                    <div className="flex gap-[var(--small-gap)]" key={index}>
                      <div>{productSaleInfo.product_id}:</div>
                      <div className=" text-red-500">{productSaleInfo.discount_percent}%</div>
                    </div>
                ))}
              </div>
            </div>
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

        <div className="flex gap-[var(--small-gap)]">
          <Button
            onClick={() =>{
              
              handleCreateSale(
                "http://localhost:8020/api/v1/gmshop/promotion/create",
                files,
                newSaleInfo,
                setNewSaleInfo,
                setSales
              )
            }}
            type="submit"
            text="Lưu"
          />
          <CancelButton
            onClick={() => handleCancelCreate(setShowPopup, setNewSaleInfo)}
            text="Hủy"
          />
        </div>
      </div>
    </div>
  );
};

export default PopupSale;
