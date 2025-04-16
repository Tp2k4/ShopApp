interface AvatarProps {
  src: string;
  size?: string;
  className?: string;
  [key: string]: any;
}

function Avatar({ size = "84px", src, className = "", ...rest }: AvatarProps) {
  return (
    <img
      className="rounded-full object-cover"
      src={src}
      alt="Avatar"
      style={{ width: size, height: size }}
      {...rest}
    />
  );
}

export default Avatar;
