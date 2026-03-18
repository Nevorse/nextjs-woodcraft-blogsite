import { cn } from "@/lib/utils";
import React, { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type CombinedProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

type InputProps = {
  name: string;
  label?: string;
  as?: "input" | "textarea";
  rows?: number;
  type?: string;
  error?: string;
  outlined?: boolean;
} & Partial<CombinedProps>;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      name,
      label,
      as = "input",
      rows,
      type = "text",
      error,
      outlined = false,
      value,
      onChange,
      className,
      placeholder,
      ...props
    },
    ref,
  ) => {

    const commonClassName = cn(
      `w-full p-3 bg-(--theme-primary) shadow-md border border-(--color-primary)
    [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-(--theme-tertiary) [&::-webkit-scrollbar-thumb]:rounded-full 
    [&::-webkit-resizer]:bg-(--theme-tertiary) [&::-webkit-scrollbar-corner]:bg-transparent [&::-webkit-resizer]:[clip-path:polygon(100%_0,100%_100%,0_100%)]`,
    outlined ? "focus:outline-2 focus:outline-(--color-primary) focus:outline-offset-4 rounded-[1px]" : "outline-none",
    error && "border-red-800",
    className,
    );

    return (
      <div className="flex flex-col grow gap-1">
        {label && (
          <label htmlFor={name} className="text-(--color-primary)">
            {label}
          </label>
        )}

        {as === "input" && (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className={commonClassName}
            placeholder={placeholder}
            ref={ref as React.Ref<HTMLInputElement>} // Ref'i cast ediyoruz
            {...props}
          />
        )}

        {as === "textarea" && (
          <textarea
            id={name}
            name={name}
            rows={rows}
            value={value}
            onChange={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
              onChange?.(e);
            }}
            placeholder={placeholder}
            className={commonClassName}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...props}
          />
        )}
        {error && <span className=" text-red-600/75 text-sm ">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
