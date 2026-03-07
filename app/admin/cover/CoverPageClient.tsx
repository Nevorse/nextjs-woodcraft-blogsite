"use client";

import DndSortableGrid from "@/components/ui/admin/DndSortableGrid";
import CoverPageSettings from "./CoverPageSettings";
import { CoverTextValues } from "./page";
import AdminImageCard, { ImageCardType } from "@/components/ui/admin/AdminImageCard";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  updateSiteSettings,
  UpdateSiteSettingsParams,
} from "@/lib/actions/db/siteSettings-actions";
import { isEqual } from "lodash";
import { updateAlbumBySlug } from "@/lib/actions/db/album-actions";
import toast from "react-hot-toast";
import { updateImageOrders } from "@/lib/actions/db/image-actions";

type CoverPageClientProps = {
  initialCoverImageLimit: number | undefined;
  initialCoverTextLimit: number | undefined;
  initialCoverTexts?: CoverTextValues;
  coverAlbumImages: ImageCardType[] | undefined;
};

export default function CoverPageClient({
  initialCoverImageLimit,
  initialCoverTextLimit,
  initialCoverTexts = {},
  coverAlbumImages = [],
}: CoverPageClientProps) {
  const [coverImagesState, setCoverImagesState] = useState(coverAlbumImages);
  const [imageErrors, setImageErrors] = useState<Record<string, string>>({});
  const prevCoverAlbumImagesRef = useRef(coverAlbumImages);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const prevIds = new Set(prevCoverAlbumImagesRef.current.map((img) => img.id));
    const currentPropIds = new Set(coverAlbumImages.map((img) => img.id));

    const deletedIds = new Set([...prevIds].filter((id) => !currentPropIds.has(id)));
    const newImages = coverAlbumImages.filter((img) => !prevIds.has(img.id));

    if (deletedIds.size > 0 || newImages.length > 0) {
      setCoverImagesState((prev) => [
        ...newImages,
        ...prev.filter((img) => !deletedIds.has(img.id)),
      ]);
    }

    prevCoverAlbumImagesRef.current = coverAlbumImages;
  }, [coverAlbumImages]);

  const normalize = (obj: CoverTextValues) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value != null && value !== ""),
    );
  };

  const processSave = async (
    isLimitsChanged: boolean,
    limitDataToUpdate: UpdateSiteSettingsParams,
    isTextsModified: boolean,
    coverTextValues: CoverTextValues,
    hasOrderChanged: boolean,
  ) => {
    if (isLimitsChanged) {
      const result = await updateSiteSettings(limitDataToUpdate, pathname);
      if (!result.success) {
        throw new Error(result.error);
      }
    }

    if (isTextsModified) {
      const result = await updateAlbumBySlug(
        "cover-album",
        { content: coverTextValues },
        pathname,
      );
      if (!result.success) {
        throw new Error(result.error);
      }
    }

    if (hasOrderChanged) {
      const result = await updateImageOrders(
        [...coverImagesState]
          .reverse()
          .map((img, index) => ({ id: img.id, order: index })),
        pathname,
      );
      if (!result.success) {
        throw new Error(result.error);
      }
    }
    router.refresh();
    return { success: true };
  };

  const handleSave = async (
    coverImageLimit: number | undefined,
    coverTextLimit: number | undefined,
    coverTextValues: CoverTextValues,
  ) => {
    // Limits
    const limitDataToUpdate: UpdateSiteSettingsParams = {
      ...(coverImageLimit !== initialCoverImageLimit && {
        coverImageLimit: coverImageLimit,
      }),
      ...(coverTextLimit !== initialCoverTextLimit && {
        coverTextLimit: coverTextLimit,
      }),
    };
    const isLimitsChanged = Object.values(limitDataToUpdate).some((val) => val !== null);

    // Cover Album
    const isTextsModified = !isEqual(
      normalize(coverTextValues),
      normalize(initialCoverTexts),
    );
    const hasOrderChanged = coverImagesState.some(
      (img, index) => img.id !== coverAlbumImages[index].id,
    );

    const isAnythingChanged = isLimitsChanged || isTextsModified || hasOrderChanged;

    if (!isAnythingChanged) {
      toast.error("Değişiklik yapılmadı");
      return;
    }
    try {
      const promise = processSave(
        isLimitsChanged,
        limitDataToUpdate,
        isTextsModified,
        coverTextValues,
        hasOrderChanged,
      );
      await toast.promise(promise, {
        loading: "Değişiklikler kaydediliyor...",
        success: "Kaydedildi.",
        error: (err) => `Bir hata oluştu: ${err.message}`,
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Bilinmeyen hata";
      console.error("Error Message:", errorMessage);
    }
  };

  const handleOptimisticDeleteImage = (deletedImage: ImageCardType) => {
    setCoverImagesState((prev) => prev.filter((img) => img.id !== deletedImage.id));

    // Restore function
    return (errorMessage: string) => {
      setCoverImagesState((prev) => {
        const newIndex = prev.findIndex((img) => img.order < deletedImage.order);
        const insertAt = newIndex === -1 ? prev.length : newIndex;

        return [...prev.slice(0, insertAt), deletedImage, ...prev.slice(insertAt)];
      });
      setImageErrors((prev) => ({ ...prev, [deletedImage.id]: errorMessage }));
    };
  };

  return (
    <>
      <CoverPageSettings
        initialCoverImageLimit={initialCoverImageLimit}
        initialCoverTextLimit={initialCoverTextLimit}
        initialCoverTexts={initialCoverTexts}
        handleSave={handleSave}
      />

      {coverImagesState.length > 0 && (
        <DndSortableGrid itemState={coverImagesState} setItemState={setCoverImagesState}>
          <div className="flex flex-wrap justify-center mt-24 gap-3">
            {coverImagesState.map((itemData) => (
              <AdminImageCard
                key={`${itemData.id}`}
                itemData={itemData}
                onDelete={handleOptimisticDeleteImage}
                errorMessage={imageErrors[itemData.id]}
              />
            ))}
          </div>
        </DndSortableGrid>
      )}
    </>
  );
}
