import Icon from "../../shared/components/ui/DynamicIcon";
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        className={`
          w-5 h-5 border-2 rounded flex items-center justify-center transition-all
          ${
            checked
              ? "bg-[var(--primary-color)] border-[var(--primary-color)] text-white"
              : "bg-white border-gray-300 hover:border-[var(--primary-color)]"
          }
        `}
        onClick={() => onChange(!checked)}
      >
        {checked && <Icon name="BiCheck" size="16" />}
      </div>
      {label && <span className="body-text">{label}</span>}
    </label>
  );
};

export default Checkbox;
