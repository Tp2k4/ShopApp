interface HomeBannerProps {
  imageSource: string;
}
const HomeBanner = ({ imageSource }: HomeBannerProps) => {
  return (
    <img
      src={imageSource}
      alt="Home Banner"
      className="object-cover w-full h-full "
    />
  );
};
export default HomeBanner;
