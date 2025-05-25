import avatar from "../../assets/avatar/avatar.jpg";
function HomeBanner() {
  return (
    <div className="flex w-full h-auto ">
      <div className="w-[var(--big-banner-width)] h-[var(--big-banner-height)] justify-center items-center p-">
        <img
          src={avatar}
          alt="Home Banner"
          className="object-cover object-center w-full h-full"
        />
      </div>
    </div>
  );
}
export default HomeBanner;
