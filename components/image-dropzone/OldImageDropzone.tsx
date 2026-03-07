"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { LuUpload as UploadIcon } from "react-icons/lu";
import toast from "react-hot-toast";
import { WorkerResponse } from "@/lib/types/worker";
import { saveImagesToAlbum } from "@/lib/actions/db/image-actions";
import { usePathname } from "next/navigation";
import SubmitButton from "../ui/form/SubmitButton";
import PreviewItem from "./PreviewItem";

type UploadType = "cover" | "services" | "projects";

type ImageDropzoneProps = {
  xType: UploadType;
  albumId: string | undefined;
};

export type FilePreview = {
  id: string;
  file: File;
  preview: string;
  status: "idle" | "uploading" | "error" | "done";
  fileName?: string;
  fileUuid?: string;
  error?: string;
};

export default function ImageDropzone({ xType, albumId }: ImageDropzoneProps) {
  const previewsRef = useRef<FilePreview[]>([]);
  const [previews, setPreviews] = useState<FilePreview[]>([]);
  const pathname = usePathname();
  const uploadableStatuses = ["idle", "error"];

  // Bellek temizliği
  useEffect(() => {
    // useRef ile güncel previews’i tut.
    previewsRef.current = previews;
  }, [previews]);
  useEffect(() => {
    return () => {
      previewsRef.current.forEach((p) => {
        URL.revokeObjectURL(p.preview);
      });
    };
  }, []);

  const onDrop = useCallback((accepted: File[]) => {
    const newPreviews = accepted.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      status: "idle" as const,
    }));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/gif": [],
    },
    onDropRejected: () => {
      toast.error("Geçersiz dosya tipi veya boyutu");
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (id: string) => {
    const fileToRemove = previews.find((p) => p.id === id);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    setPreviews((prev) => prev.filter((p) => p.id !== id));
  };

  const uploadImagesToBucket: () => Promise<
    | { success: false; error: string }
    | { success: true; successPaths: string[]; total: number }
  > = async () => {
    const filesToUpload = previews
      .filter((p) => uploadableStatuses.includes(p.status))
      .toReversed();
    if (!filesToUpload.length) {
      return { success: false, error: "Yüklenecek dosya yok" };
    }
    if (!albumId) {
      return { success: false, error: "Albüm ID Bulunamadı!" };
    }
    // Create form data
    const formData = new FormData();
    filesToUpload.forEach((p) => {
      formData.append("file", p.file);
    });
    formData.append("x-type", xType);
    formData.append("album-id", albumId);

    // Set uploading status
    setPreviews((prev) =>
      prev.map((p) =>
        uploadableStatuses.includes(p.status)
          ? { ...p, status: "uploading", error: undefined }
          : p,
      ),
    );
    const res = await fetch("/api/worker/images", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error };
    }
    const responseData = data as WorkerResponse;
    if (!responseData.success) {
      return responseData;
    }

    const failedItems = responseData.files
      .map((result, index): FilePreview | null => {
        if (!result.ok) {
          return {
            ...filesToUpload[index],
            status: "error" as const,
            error: result.error,
          };
        }
        return null;
      })
      .filter((item): item is FilePreview => item !== null);

    const successItems = responseData.files
      .map((result, index): FilePreview | null => {
        if (result.ok) {
          return {
            ...filesToUpload[index],
            status: "done" as const,
            fileUuid: result.data.file,
          };
        }
        return null;
      })
      .filter((item): item is FilePreview => item !== null);

    setPreviews((prev) =>
      prev
        .filter((p) => !successItems.some((s) => s.id === p.id))
        .map((p) => {
          const failed = failedItems.find((f) => f.id === p.id);
          return failed ? { ...p, status: "error", error: failed.error } : p;
        }),
    );
    if (successItems.length) {
      // Yüklenenleri temizle
      successItems.forEach((item) => {
        URL.revokeObjectURL(item.preview);
      });
    }
    // const successUuids = successItems
    //   .map((f) => f.fileUuid)
    //   .filter((uuid): uuid is string => Boolean(uuid));

    return {
      success: true,
      successPaths: responseData.successPaths,
      total: responseData.files.length,
    };
  };

  const processUpload = async () => {
    if (!albumId) {
      throw new Error("Albüm ID Bulunamadı!");
    }
    const bucketResult = await uploadImagesToBucket();
    if (!bucketResult.success) {
      throw new Error(bucketResult.error);
    }
    const dbResult = await saveImagesToAlbum(
      bucketResult.successPaths,
      albumId,
      pathname,
    );
    if (!dbResult.success) {
      throw new Error(dbResult.error);
    }
    const failedCount = bucketResult.total - dbResult.count;
    return { successCount: dbResult.count, failedCount };
  };

  const handleUploadClick = async () => {
    try {
      await toast.promise(processUpload(), {
        loading: "Resimler Yükleniyor ve kaydediliyor...",
        success: (data) =>
          data.failedCount > 0
            ? `${data.successCount} resim başarıyla eklendi (${data.failedCount} başarısız).`
            : `${data.successCount} resim başarıyla eklendi.`,
        error: (err) => `Bir hata oluştu: ${err.message}`,
      });
    } catch (error) {
      setPreviews((prev) =>
        prev.map((p) => (p.status === "uploading" ? { ...p, status: "error" } : p)),
      );

      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Bilinmeyen hata";
      console.error("Error Message:", errorMessage);
    }
  };

  const idleCount = previews.filter((p) => uploadableStatuses.includes(p.status)).length;

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
        max-w-200 w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-(--color-primary) bg-(--color-primary)/5"
              : "border-muted-foreground/30 hover:border-(--color-primary)/50 hover:bg-muted/40"
          }`}
      >
        <input {...getInputProps()} />
        <div
          className={`flex flex-col items-center gap-2 
          ${isDragActive ? "text-(--color-primary)" : "text-muted-foreground"}
          `}
        >
          <UploadIcon size={24} />
          <p className="text-sm font-medium">
            {isDragActive ? " Dosyaları bırak..." : "Sürükle bırak veya seç"}
          </p>
          <p className="text-xs">JPG, PNG, WEBP, GIF · Max 10MB</p>
        </div>
      </div>

      {/* Upload button */}
      {previews.length > 0 && (
        <SubmitButton
          // isSubmitting={isSubmitting}
          disabled={!idleCount}
          buttonName={`Yükle (${idleCount} dosya)`}
          pendingButtonName={`Yükleniyor... (${previews.filter((p) => p.status === "uploading").length} dosya)`}
          type="button"
          className="bg-(--color-primary)!"
          onClick={handleUploadClick}
        />
      )}

      {/* Previews */}
      {previews.length > 0 && (
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-3">
          {previews.map((item) => (
            <PreviewItem
              key={item.id}
              item={item}
              removeFile={removeFile}
              uploadableStatuses={uploadableStatuses}
            />
          ))}
        </div>
      )}
    </div>
  );
}
