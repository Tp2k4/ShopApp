interface LineProps {
  width?: string;
}

function Line({ width }: LineProps) {
  return (
    <div className={`h-[0.5px] bg-[var(--line-color)] my-4 ${width} `}></div>
  );
}

export default Line;
