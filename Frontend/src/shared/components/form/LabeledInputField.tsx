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
  inputFieldWidth,
  labelWidth,
  className,
}: Props) {
  return (
    <div className="flex items-center">
      <div className={`${labelWidth || "w-[180px]"} ${className}`}>
        <strong>{label}</strong>
      </div>
      <InputField
        value={value}
        onChange={onChange}
        width={inputFieldWidth || "w-1/2"}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}

export default LabeledInputField;