import { useEffect, useState } from "react";
import { useGet } from "../../service/crudService";
import HeaderUser from "../../shared/components/ui/HeaderUser";
import HomeBanner from "../pagecontents/HomeBanner";
import HomeSideBar from "../pagecontents/HomeSideBar";
import ItemCard from "../pagecontents/ItemCard";
import { useFilter, useSearch } from "../../service/queryService";

function UserHome() {
  const { data: productInfos, setData: setProductInfos } = useGet(
    "https://gm-12tk.onrender.com/api/v1/gmshop/product"
  );
  const { data: thumbnails } = useGet(
    "https://gm-12tk.onrender.com/api/v1/gmshop/promotion"
  );

  const [thumbnailList, setThumbnailList] = useState<any[]>([]);
  console.log(thumbnailList);

  useEffect(() => {
    if (Array.isArray(thumbnails)) {
      setThumbnailList(thumbnails);
    }
  }, [thumbnails]);

  // Lọc và tìm kiếm sản phẩm
  const filterOptions = ["all", "mouse", "keyboard", "headphone"];

  const {
    filteredItems: filteredByType,
    selectedFilter,
    setSelectedFilter,
  } = useFilter(productInfos, filterOptions, "category_id");

  const {
    filteredItems: filteredBySearch,
    searchQuery,
    setSearchQuery,
  } = useSearch(productInfos, "name");

  const finalFilteredItems = filteredBySearch.filter((item) =>
    filteredByType.includes(item)
  );

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
            <HomeBanner imageSource={thumbnailList[0]?.thumbnail} />
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner imageSource={thumbnailList[1]?.thumbnail} />
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner imageSource={thumbnailList[2]?.thumbnail} />
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner imageSource={thumbnailList[3]?.thumbnail} />
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner imageSource={thumbnailList[2]?.thumbnail} />
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner imageSource={thumbnailList[1]?.thumbnail} />
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
