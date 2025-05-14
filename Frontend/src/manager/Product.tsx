import { FilterButton, SearchField } from "../shared/components/form";
import { Box } from "../shared/components/ui";
import { Button } from "../shared/components/button";
import { useFilter, useSearch } from "../service/queryService";
import ManagerLayout from "./ManagerLayout";
import ProductList from "../shared/components/list/ProductList";
import PopupProduct from "../shared/components/pupup/PopupProduct";

import { useState, useEffect } from "react";
import { useGetProduct } from "../service/crudService/useGetProduct";

function Product() {
  //================ Nhận products từ API
  const { data: productDatas, setData: setProductDatas } = useGetProduct(
    "http://localhost:8020/api/v1/gmshop/product",
    {
      page: "1",
      limit: "10",
    }
  );

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (productDatas?.products) {
      setProducts(productDatas.products);
    }
  }, [productDatas]);

  //================ Lọc và tìm kiếm
  const filterOptions = ["Tất cả", "Chuột", "Bàn phím", "Tai nghe"];

  // Lọc
  const {
    filteredItems: filteredByType,
    selectedFilter,
    setSelectedFilter,
  } = useFilter(products, filterOptions, "type");

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

          <ProductList products={finalFilteredItems} />
        </div>
      </Box>

      {/* Popup Screen, chức năng thêm sản phẩm nằm bên trong PopupProduct */}
      {showPopup && (
        <PopupProduct setProducts={setProducts} setShowPopup={setShowPopup} />
      )}
    </ManagerLayout>
  );
}

export default Product;
