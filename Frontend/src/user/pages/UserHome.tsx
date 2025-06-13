import { useEffect, useState } from "react";
import { useGet } from "../../service/crudService";
import HeaderUser from "../../shared/components/ui/HeaderUser";
import HomeBanner from "../pagecontents/HomeBanner";
import HomeSideBar from "../pagecontents/HomeSideBar";
import ItemCard from "../pagecontents/ItemCard";
import { useFilter, useSearch } from "../../service/queryService";
import sample from "../../assets/avatar/sample.jpg";

function UserHome() {
  const { data: productInfos, setData: setProductInfos } = useGet(
    "http://localhost:8020/api/v1/gmshop/product"
  );
  const { data: thumbnails } = useGet(
    "http://localhost:8020/api/v1/gmshop/promotion"
  );

  const [thumbnailList, setThumbnailList] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(thumbnails)) {
      setThumbnailList(thumbnails);
    }
  }, [thumbnails]);

  // Lọc và tìm kiếm sản phẩm
  //================ Lọc và tìm kiếm
  const filterOptions = ["all", "mouse", "keyboard", "headphone"];

  // Lọc
  const {
    filteredItems: filteredByType,
    selectedFilter,
    setSelectedFilter,
  } = useFilter(productInfos, filterOptions, "category_id");

  // Tìm kiếm
  const {
    filteredItems: filteredBySearch,
    searchQuery,
    setSearchQuery,
  } = useSearch(productInfos, "name");

  // Gộp 2 kết quả lọc và tìm kiếm
  const finalFilteredItems = filteredBySearch.filter((item) =>
    filteredByType.includes(item)
  );

  // {`http://localhost:8020/promotions/${thumbnailList[4].thumbnail}`}

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-[var(--big-gap)] overflow-y-auto overflow-x-hidden">
      <HeaderUser
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        name="nguyên"
      />
      <div className="flex justify-center gap-[var(--medium-gap)] w-[var(--max-width-content)] h-full">
        <div className="grid grid-cols-11 grid-rows-3 gap-[var(--medium-gap)] w-full h-full ">
          <div className="w-full h-full col-span-2 row-span-3 overflow-hidden bg-white rounded-md">
            <HomeSideBar
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </div>
          <div className="aspect-[195/100] h-full col-span-6 row-span-2 rounded-md overflow-hidden">
            <HomeBanner imageSource={sample} />
            {/* `http://localhost:8020/promotions/${thumbnailList[0].thumbnail}` */}
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner imageSource={sample} />
            {/* `http://localhost:8020/promotions/${thumbnailList[2].thumbnail}` */}
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner imageSource={sample} />
            {/* `http://localhost:8020/promotions/${thumbnailList[3].thumbnail}` */}
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner imageSource={sample} />
            {/* `http://localhost:8020/promotions/${thumbnailList[4].thumbnail}` */}
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner imageSource={sample} />
            {/* `http://localhost:8020/promotions/${thumbnailList[1].thumbnail}` */}
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner imageSource={sample} />
            {/* `http://localhost:8020/promotions/${thumbnailList[2].thumbnail}` */}
            {/*  */}
          </div>
        </div>
      </div>
      <div className="max-w-[var(--max-width-content)] h-auto">
        <div className="w-full h-full bg-white p-[var(--medium-gap)] rounded-md">
          <div className="grid grid-cols-5 auto-rows-auto gap-[var(--semi-medium-gap)] items-center justify-center">
            {finalFilteredItems.map((productInfo: any) => (
              <ItemCard key={productInfo.id} productInfo={productInfo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
