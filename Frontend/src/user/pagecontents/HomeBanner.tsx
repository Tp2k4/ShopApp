import avatar from "../../assets/avatar/sample.jpg";

export default function HomeBanner() {
  return (
    <img
      src={avatar}
      alt="Home Banner"
      className="object-cover w-full h-full "
    />
  );
}
