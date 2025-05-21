interface BoxProps {
  width?: string;
  height?: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

function Box({ width, height, children, className = "", ...rest }: BoxProps) {
  return (
    <div
      className={`bg-white rounded-lg ${className}`}
      style={{ width, height }}
      {...rest}
    >
      {children}
    </div>
  );
}
export default Box;
