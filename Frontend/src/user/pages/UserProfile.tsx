import HeaderUserNoSearch from "../../shared/components/ui/HeaderUserNoSearch";
import UserProfileNavigation from "../../shared/components/ui/UserProfileNavigation";
import ProfileInfo from "../pagecontents/ProfileInfo";
import Footer from "../../shared/components/ui/Footer";
function UserProfile() {
  return (
    <div className="h-screen w-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <HeaderUserNoSearch name="nguyên" />
      <div className="flex justify-center gap-[var(--medium-gap)] w-[75%] h-full">
        <UserProfileNavigation className="w-[25%] h-[400px]" />
        <ProfileInfo className="flex flex-col gap-[var(--medium-gap)] w-[75%] h-[400px]" />
      </div>
      <Footer className="" />
    </div>
  );
}

export default UserProfile;
