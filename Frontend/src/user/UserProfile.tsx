import HeaderUser from "../shared/components/ui/HeaderUser";
import UserProfileNavigation from "../shared/components/ui/UserProfileNavigation";
import ProfileInfo from "./ProfileInfo";

function UserProfile() {
  return (
    <div className="h-screen w-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <HeaderUser name="cac" />

      <div className="flex justify-center gap-[var(--medium-gap)] w-[75%] h-full">
        <UserProfileNavigation className="w-[25%] h-[400px]" />
        <ProfileInfo className="flex flex-col gap-[var(--medium-gap)] w-[75%] h-[400px]" />
      </div>
    </div>
  );
}

export default UserProfile;
