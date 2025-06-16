import { Box } from "../../shared/components/ui";

interface HomeSideBarProps {
  className?: string;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  [key: string]: any;
}

function HomeSideBar({
  children,
  className = "",
  selectedFilter,
  setSelectedFilter,
  ...rest
}: HomeSideBarProps) {
  const filterOptions = [
    { label: "Tất cả", value: "all" },
    { label: "Chuột", value: "mouse" },
    { label: "Bàn phím", value: "keyboard" },
    { label: "Tai nghe", value: "headphone" },
  ];

  return (
    <Box
      className={`rounded-none h-auto w-full flex flex-col ${className}`}
      {...rest}
    >
      {filterOptions.map((option) => (
        <button
          key={option.value}
          className={`text-left px-4 py-2 w-full transition-colors rounded-none ${
            selectedFilter === option.value
              ? "bg-[var(--primary-color)] text-white "
              : "hover:bg-[var(--primary-hover)] hover:text-white text-[var(--primary-color)]"
          }`}
          onClick={() => setSelectedFilter(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </Box>
  );
}

export default HomeSideBar;
