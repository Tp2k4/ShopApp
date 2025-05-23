import InputField from "./InputField";

interface Props {
  label: string;
  labelWidth?: string;
  placeholder: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputFieldWidth?: string;
}
function LabeledInputField({
  label,
  placeholder,
  value,
  onChange,
  inputFieldWidth = "flex-1",
  labelWidth = "w-[180px]",
  className = "",
}: Props) {
  return (
    <div className="flex items-center">
      <div className={`${labelWidth} ${className}`}>
        <strong>{label}</strong>
      </div>
      <InputField
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className={inputFieldWidth}
      />
    </div>
  );
}

export default LabeledInputField;
