import avatar from "../../assets/avatar/avatar.jpg";

interface BigHomeBannerProps {
  className?: string;
  [key: string]: any;
}

function BigHomeBanner({ className = "", ...rest }: BigHomeBannerProps) {
  return (
    <div className="width-[720px] aspect-ratio-[2/1]">
      <img
        src={avatar}
        alt="Home Banner"
        className={`object-cover w-full h-full ${className}`}
        {...rest}
      />
    </div>
  );
}
export default BigHomeBanner;
