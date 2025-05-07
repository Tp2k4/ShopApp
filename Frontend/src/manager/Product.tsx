import ManagerLayout from "../shared/layout/ManagerLayout";
import Box from "../shared/components/ui/Box";
import Button from "../shared/components/button/Button";
import FilterButton from "../shared/components/form/FilterButton";
import SearchField from "../shared/components/form/SearchField";
import ProductList from "../shared/components/list/ProductList";

import { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState<any[]>([]);
  const filter = ["Tất cả", "Chuột", "Bàn phím", "Tai nghe"];

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
            <Button type="button" text="Thêm sản phẩm" width="auto" />
            <div className="flex items-center gap-[var(--small-gap)]">
              <FilterButton filter={filter} />
              <SearchField width="300px" />
            </div>
          </div>

          <ProductList products={products} />
        </div>
      </Box>
    </ManagerLayout>
  );
}

export default Product;
