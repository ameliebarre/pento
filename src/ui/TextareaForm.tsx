import { ComponentProps, KeyboardEvent } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface TextareaFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  label?: string;
  name: Path<T>;
  required?: boolean;
  error?: FieldError;
}

export default function TextareaForm<T extends FieldValues>({
  register,
  label,
  name,
  required = false,
  error,
}: TextareaFormProps<T>) {
  return (
    <div className="flex flex-col mb-4 w-full">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...register(name, { required })}
        id={name}
        name={name}
        className={[
          "h-32 max-h-52 mt-1 bg-neutral-100 rounded-md p-2 text-gray-900 resize-y",
          "focus:ring-1 focus:ring-primary-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none",
        ].join(" ")}
      />
      {error && <p className="text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}
