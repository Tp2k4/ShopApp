import HeaderUser from "../../shared/components/ui/HeaderUser";
import HomeBanner from "../pagecontents/HomeBanner";
import HomeSideBar from "../pagecontents/HomeSideBar";
import ItemCard from "../pagecontents/ItemCard";

function UserHome() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center gap-[var(--big-gap)] overflow-y-auto overflow-x-hidden">
      <HeaderUser name="nguyên" />
      <div className="flex justify-center gap-[var(--medium-gap)] w-full h-full">
        <HomeSideBar />
        <div className="grid grid-cols-3 grid-rows-3 gap-[var(--medium-gap)]">
          <div className="w-[var(--big-banner-width)] h-[var(--big-banner-height)] col-span-2 row-span-2">
            <HomeBanner />
          </div>
          <div className="w-[var(--small-banner-width)] aspect-[2/1]">
            <HomeBanner />
          </div>
          <div className="w-[var(--small-banner-width)] aspect-[2/1]">
            <HomeBanner />
          </div>
          <div className="w-[var(--small-banner-width)] aspect-[2/1]">
            <HomeBanner />
          </div>
          <div className="w-[var(--small-banner-width)] aspect-[2/1]">
            <HomeBanner />
          </div>
          <div className="w-[var(--small-banner-width)] aspect-[2/1]">
            <HomeBanner />
          </div>
        </div>
      </div>
      <div className="h-auto w-[80%]">
        <div className="grid grid-cols-5 auto-rows-auto gap-[var(--medium-gap)] bg-white items-center justify-center">
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
    </div>
  );
}

export default UserHome;
