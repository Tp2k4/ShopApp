import { useGet } from "../../service/crudService";
import HeaderUser from "../../shared/components/ui/HeaderUser";
import HomeBanner from "../pagecontents/HomeBanner";
import HomeSideBar from "../pagecontents/HomeSideBar";
import ItemCard from "../pagecontents/ItemCard";

function UserHome() {
  const { data: productInfos } = useGet(
    "http://localhost:8020/api/v1/gmshop/product"
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-[var(--big-gap)] overflow-y-auto overflow-x-hidden">
      <HeaderUser name="nguyên" />
      <div className="flex justify-center gap-[var(--medium-gap)] w-[var(--max-width-content)] h-full">
        <div className="grid grid-cols-11 grid-rows-3 gap-[var(--medium-gap)] w-full h-full ">
          <div className="w-full h-full col-span-2 row-span-3 overflow-hidden bg-white rounded-md">
            <HomeSideBar />
          </div>
          <div className="aspect-[195/100] h-full col-span-6 row-span-2 rounded-md overflow-hidden">
            <HomeBanner />
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner />
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner />
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner />
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner />
          </div>
          <div className="aspect-[2/1] col-span-3 row-span-1 rounded-md overflow-hidden">
            <HomeBanner />
            {/*  */}
          </div>
        </div>
      </div>
      <div className="max-w-[var(--max-width-content)] h-auto">
        <div className="w-full h-full bg-white p-[var(--medium-gap)] rounded-md">
          <div className="grid grid-cols-5 auto-rows-auto gap-[var(--semi-medium-gap)] items-center justify-center">
            {productInfos.map((productInfo: any) => (
              <ItemCard productInfo={productInfo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
