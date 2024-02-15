import Switch from "react-switch";

interface SwitchFormProps {
  label: string;
  onChange: (status: boolean) => void;
  checked: boolean;
  onColor: string;
  onHandleColor: string;
  width?: number;
  height?: number;
}

export default function SwitchForm({
  label,
  onChange,
  checked,
  onColor,
  onHandleColor,
  width = 55,
  height = 30,
}: SwitchFormProps) {
  return (
    <label className="flex gap-4 py-2 items-center">
      <span>{label}</span>
      <Switch
        onChange={onChange}
        checked={checked}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor={onColor}
        onHandleColor={onHandleColor}
        handleDiameter={20}
        height={height}
        width={width}
      />
    </label>
  );
}
