"use client";

import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

export function useConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const resolveRef = useRef<(value: boolean) => void>(() => {});

  const confirm = useCallback((opts: ConfirmOptions = {}): Promise<boolean> => {
    setOptions(opts);
    setOpen(true);
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const handleConfirm = async () => {
    setLoading(true);
    resolveRef.current?.(true);
    setLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    resolveRef.current?.(false);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) handleCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, loading]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const ConfirmDialog = useCallback(() => {
    if (!open) return null;


    return (
      <div
        onClick={(e) => e.target === e.currentTarget && !loading && handleCancel()}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div
          role="alertdialog"
          aria-modal="true"
          className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-zinc-900"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {options.title ?? "Emin misiniz?"}
          </h2>
          {options.description && (
            <p className="mt-1 whitespace-pre-line text-sm text-gray-500 dark:text-gray-400">
              {options.description}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-800"
            >
              {options.cancelText ?? "İptal"}
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex items-center gap-2 rounded-md bg-(--color-primary) px-4 py-2 text-sm font-medium text-white hover:bg-orange-700/90 disabled:opacity-70"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? "Lütfen bekleyin..." : (options.confirmText ?? "Devam Et")}
            </button>
          </div>
        </div>
      </div>
    );


  }, [open, loading, options]);

  return { confirm, ConfirmDialog };
}
