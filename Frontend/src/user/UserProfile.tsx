import Header from "../shared/components/ui/Header";
import Box from "../shared/components/ui/Box";
import UserProfileNavigation from "../shared/components/ui/UserProfileNavigation";

function UserProfile() {
  return (
    <div className="h-screen w-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <Header role="user" />

      <div className="flexW justify-center gap-[var(--medium-gap)]  w-[75%] h-full">
        <UserProfileNavigation className=" width" />
        <Box
          className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
          width="75%"
          height="400px"
        ></Box>
      </div>
    </div>
  );
}

export default UserProfile;
