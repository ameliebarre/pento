import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
} from "react-hook-form";
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
  error?: Merge<FieldError, FieldErrorsImpl<{ value: string; label: string }>>;
}

export default function SelectForm<T extends FieldValues>({
  control,
  name,
  options,
  label,
  colourStyles,
  error,
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
      {error && <p className="text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}
