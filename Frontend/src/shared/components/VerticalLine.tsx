interface VerticalLineProps {
  height: string;
  color: string;
  className?: string;
  [key: string]: any;
}

function VerticalLine({
  height,
  className = "",
  color,
  ...rest
}: VerticalLineProps) {
  return (
    <div
      className="w-[0.5px]"
      style={{ height, backgroundColor: color }}
      {...rest}
    ></div>
  );
}

export default VerticalLine;
