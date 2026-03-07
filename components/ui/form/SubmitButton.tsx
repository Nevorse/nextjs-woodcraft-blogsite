"use client";

import { Spinner } from "@/components/ui/general/icons";
import { useState } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting?: boolean;
  buttonName?: string;
  pendingButtonName?: string;
};
export default function SubmitButton({
  isSubmitting: externalIsSubmitting,
  buttonName,
  pendingButtonName,
  className,
  onClick,
  type,
  ...props
}: ButtonProps) {
  const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);

  const isLoading = externalIsSubmitting ?? internalIsSubmitting;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;
    try {
      if (onClick) {
        setInternalIsSubmitting(true);
        await onClick(e);
      }
    } finally {
      setInternalIsSubmitting(false);
    }
  };

  return (
    <button
      {...props}
      type={type || "submit"}
      onClick={handleClick}
      disabled={isLoading || props.disabled}
      className={`inline-flex items-center px-5 py-2 mt-1 font-semibold leading-6 text-sm shadow-md 
                  rounded-md text-(--color-secondary) bg-(--color-tertiary) transition-all 
                  enabled:hover:opacity-80
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  ${className || ""}
                  ${isLoading ? "cursor-not-allowed! opacity-70!" : ""}`}
    >
      {isLoading ? (
        <>
          <Spinner />
          {pendingButtonName || "Gönderiliyor..."}
        </>
      ) : (
        <>{buttonName || "Gönder"}</>
      )}
    </button>
  );
}
