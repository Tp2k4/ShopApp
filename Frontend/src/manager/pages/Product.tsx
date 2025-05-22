import { FilterButton, SearchField } from "../../shared/components/form";
import { Box } from "../../shared/components/ui";
import { Button } from "../../shared/components/button";
import { useFilter, useSearch } from "../../service/queryService";
import ManagerLayout from "../ManagerLayout";
import ProductList from "../list/ProductList";
import PopupProduct from "../popup/popupAdd/PopupProduct";
import { useGetProducts } from "../../service/crudService";
import PopupProductModify from "../popup/popupModify/PopupProductModify";
import PopupConfirmDelete from "../popup/pupupConfirmDelete/PopupConfirmDelete";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Product() {
  //================ Nhận products từ API
  const { data: productDatas } = useGetProducts(
    "http://localhost:8020/api/v1/gmshop/product",
    {
      page: "1",
      limit: "10",
    }
  );

  const [products, setProducts] = useState<any[]>([]);

  // Cần set do productDatas có {totalPage, products}
  useEffect(() => {
    if (productDatas?.products) {
      setProducts(productDatas.products);
    }
  }, [productDatas]);

  //================ Lọc và tìm kiếm
  const filterOptions = ["all", "mouse", "keyboard", "headphone"];

  // Lọc
  const {
    filteredItems: filteredByType,
    selectedFilter,
    setSelectedFilter,
  } = useFilter(products, filterOptions, "category_id");

  // Tìm kiếm
  const {
    filteredItems: filteredBySearch,
    searchQuery,
    setSearchQuery,
  } = useSearch(products, "name");

  // Gộp 2 kết quả lọc và tìm kiếm
  const finalFilteredItems = filteredBySearch.filter((item) =>
    filteredByType.includes(item)
  );

  //================ PopupScreen
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupModify, setShowPopupModify] = useState(false);
  const [showPopupConfirmDelete, setShowPopupConfirmDelete] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  // Lấy tài khoản hiện đang được chọn để chỉnh sửa đưa vào AccountList
  const [modifyingProduct, setModifyingProduct] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // Sẽ lấy product đang được chỉnh sửa lưu vào modifyingAccount nếu có id được trả về từ params
  /* Cần thêm accounts tại [id, accounts] ở dòng  useEffect bên dưới vì: lần đầu gọi API, 
     accounts sẽ chưa có dữ liệu do chưa gọi API xong, do đó product = accounts.find(...) sẽ undefined,
     vì vậy thêm accounts để product được gán lại giá trị khi đã gọi API xong. */
  useEffect(() => {
    if (id && products.length > 0) {
      const product = products.find(
        (product: any) => String(product.id) === id
      );
      if (product) {
        setModifyingProduct(product);
      }
    }
  }, [id, products]);

  return (
    <ManagerLayout>
      <Box
        className="rounded-none min-h-[calc(100vh_-_var(--header-height))] px-[var(--medium-gap)]"
        width="100%"
      >
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ SẢN PHẨM
        </div>

        {/* */}
        <div className="flex flex-col gap-[var(--medium-gap)]">
          <div className=" flex items-center justify-between w-full">
            <Button
              onClick={() => setShowPopup(true)}
              type="button"
              text="Thêm sản phẩm"
              width="auto"
            />
            <div className="flex items-center gap-[var(--small-gap)]">
              <FilterButton
                value={selectedFilter}
                onChange={(e: any) => setSelectedFilter(e.target.value)}
                filter={filterOptions}
              />
              <SearchField
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                width="w-[300px]"
              />
            </div>
          </div>

          <div className="border border-[var(--line-color)] rounded-md overflow-hidden">
            <ProductList
              products={finalFilteredItems}
              setProducts={setProducts}
              setShowPopupModify={setShowPopupModify}
              setShowPopupConfirmDelete={setShowPopupConfirmDelete}
              setSelectedProductId={setSelectedProductId}
            />
          </div>
        </div>
      </Box>

      {/* Popup Screen, chức năng thêm sản phẩm nằm bên trong PopupProduct */}
      {showPopup && (
        <PopupProduct setProducts={setProducts} setShowPopup={setShowPopup} />
      )}

      {/* Nhận vào product cần chỉnh sửa */}
      {/* setProducts để load ngay product vừa chỉnh lên giao diện mà không cần load lại trang */}
      {/* setShowPopup để tắt Popup nếu nhấn hủy */}
      {showPopupModify && (
        <PopupProductModify
          product={modifyingProduct}
          setProducts={setProducts}
          setShowPopup={setShowPopupModify}
        />
      )}

      {/* Hiển thị hợp thoại xác nhận xóa */}
      {showPopupConfirmDelete && (
        <PopupConfirmDelete
          apiPath="http://localhost:8020/api/v1/gmshop/product/delete/"
          setItems={setProducts}
          setShowPopup={setShowPopupConfirmDelete}
          selectedItemId={selectedProductId}
        />
      )}
    </ManagerLayout>
  );
}

export default Product;
