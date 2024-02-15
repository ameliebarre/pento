import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Select, { StylesConfig } from "react-select";

export interface Options {
  value: string | number;
  label: string;
}

interface SelectFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: Options[];
  label?: string;
  colourStyles?: StylesConfig;
}

export default function SelectForm<T extends FieldValues>({
  control,
  name,
  options,
  label,
  colourStyles,
}: SelectFormProps<T>) {
  return (
    <div className="flex flex-col mb-4 w-full">
      {label ? (
        <label htmlFor={name} className="mb-1">
          Category
        </label>
      ) : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select
            options={options}
            id={name}
            styles={colourStyles}
            value={options.find((option) => option.value === value)}
            onChange={(value) => onChange(value)}
          />
        )}
      />
    </div>
  );
}
