import Header from "../shared/components/ui/Header";
import UserProfileNavigation from "../shared/components/ui/UserProfileNavigation";
import ProfileInfo from "../shared/components/form/ProfileInfo";

function UserProfile() {
  return (
    <div className="h-screen w-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <Header role="user" />

      <div className="flex justify-center gap-[var(--medium-gap)] w-[75%] h-full">
        <UserProfileNavigation className="w-[25%] h-[400px]" />
        <ProfileInfo className="flex flex-col gap-[var(--medium-gap)] w-[75%] h-[400px]" />
      </div>
    </div>
  );
}

export default UserProfile;
