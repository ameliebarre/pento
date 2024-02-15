import clsx from "clsx";
import { useState } from "react";
import { BlockPicker, ColorResult } from "react-color";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface ColorPickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  currentColor: string;
  label?: string;
  handleChangeColor: (color: ColorResult) => void;
  error?: FieldError;
}

export default function ColorPicker<T extends FieldValues>({
  control,
  name,
  currentColor,
  label,
  handleChangeColor,
  error,
}: ColorPickerProps<T>) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="flex flex-col mb-4 w-full relative">
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <input
            id={name}
            name={name}
            value={currentColor}
            className={clsx(
              "h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900",
              "focus:ring-1 focus:ring-primary-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none",
              currentColor ? "pl-[58px]" : "",
            )}
            onChange={() => onChange(currentColor)}
            onFocus={() => setShowColorPicker(true)}
            onBlur={() => setShowColorPicker(false)}
          />
        )}
      />
      {currentColor ? (
        <span
          style={{ backgroundColor: currentColor }}
          className={`absolute inset-y-0 top-[42px] left-[10px] flex items-center px-2 w-[40px] h-[20px]`}
        />
      ) : null}
      {error && <p className="text-red-500 mt-1">{error.message}</p>}

      {showColorPicker ? (
        <BlockPicker color={currentColor} onSwatchHover={handleChangeColor} />
      ) : null}
    </div>
  );
}
