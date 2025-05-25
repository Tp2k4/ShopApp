import HeaderUser from "../../shared/components/ui/HeaderUser";
import HomeBanner from "../pagecontents/HomeBanner";
import HomeSideBar from "../pagecontents/HomeSideBar";

function UserHome() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center gap-[var(--big-gap)] overflow-y-auto overflow-x-hidden">
      <HeaderUser name="nguyên" />
      <div className="flex justify-center gap-[var(--medium-gap)] w-full h-full">
        <HomeSideBar />
        <div className="flex items-center justify-center w-auto h-full">
          <HomeBanner />
          <HomeBanner />
        </div>
      </div>
    </div>
  );
}

export default UserHome;
