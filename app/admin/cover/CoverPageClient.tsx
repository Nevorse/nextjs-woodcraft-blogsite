"use client";

import DndSortableGrid from "@/components/ui/admin/DndSortableGrid";
import CoverPageSettings from "./CoverPageSettings";
import AdminImageCard, { ImageCardType } from "@/components/ui/admin/AdminImageCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  updateSiteSettings,
  UpdateSiteSettingsParams,
} from "@/lib/actions/db/siteSettings-actions";
import { isEqual } from "lodash";
import { updateAlbumBySlug } from "@/lib/actions/db/album-actions";
import toast from "react-hot-toast";
import { updateImageOrders } from "@/lib/actions/db/image-actions";
import SubmitButton from "@/components/ui/form/SubmitButton";
import { hasOrderChanged } from "@/lib/helpers/albumHelpers";
import { getErrorMessage } from "@/lib/helpers/error-helpers";
import { restoreItemInOrder } from "@/lib/helpers/imageHelpers";
import { ContentTextValues } from "@/lib/database/album";
import { normalize } from "@/lib/utils";

type CoverPageClientProps = {
  initialCoverImageLimit: number | undefined;
  initialCoverTextLimit: number | undefined;
  initialCoverTexts?: ContentTextValues;
  coverAlbumImages: ImageCardType[] | undefined;
};

export default function CoverPageClient({
  initialCoverImageLimit,
  initialCoverTextLimit,
  initialCoverTexts = {},
  coverAlbumImages = [],
}: CoverPageClientProps) {
  const [coverImageLimitState, setCoverImageLimitState] =
    useState(initialCoverImageLimit);
  const [coverTextLimitState, setCoverTextLimitState] = useState(initialCoverTextLimit);
  const [coverTextValues, setCoverTextValues] =
    useState<ContentTextValues>(initialCoverTexts);

  const [coverImagesState, setCoverImagesState] = useState(coverAlbumImages);
  const [imageErrors, setImageErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const processSave = async (
    isLimitsChanged: boolean,
    limitDataToUpdate: UpdateSiteSettingsParams,
    isTextsModified: boolean,
    orderChanged: boolean,
  ) => {
    if (isLimitsChanged) {
      const result = await updateSiteSettings({ data: limitDataToUpdate });
      if (!result.success) {
        throw new Error(result.error);
      }
    }

    if (isTextsModified) {
      const result = await updateAlbumBySlug({
        slug: "cover-album",
        data: { content: coverTextValues },
      });
      if (!result.success) {
        throw new Error(result.error);
      }
    }

    if (orderChanged) {
      const result = await updateImageOrders({ images: coverImagesState });
      if (!result.success) {
        throw new Error(result.error);
      }
    }
    return { success: true };
  };

  const handleSave = async () => {
    // Limits
    const limitDataToUpdate: UpdateSiteSettingsParams = {
      ...(coverImageLimitState !== initialCoverImageLimit && {
        coverImageLimit: coverImageLimitState,
      }),
      ...(coverTextLimitState !== initialCoverTextLimit && {
        coverTextLimit: coverTextLimitState,
      }),
    };
    const isLimitsChanged = Object.values(limitDataToUpdate).some((val) => val !== null);

    // Cover Album
    const isTextsModified = !isEqual(
      normalize(coverTextValues),
      normalize(initialCoverTexts),
    );

    const orderChanged = hasOrderChanged(coverImagesState, coverAlbumImages);

    const isAnythingChanged = isLimitsChanged || isTextsModified || orderChanged;

    if (!isAnythingChanged) {
      toast.error("Değişiklik yapılmadı");
      return;
    }
    try {
      const promise = processSave(
        isLimitsChanged,
        limitDataToUpdate,
        isTextsModified,
        orderChanged,
      );
      await toast.promise(promise, {
        loading: "Değişiklikler kaydediliyor...",
        success: "Kaydedildi.",
        error: (err) => `Bir hata oluştu: ${err.message}`,
      });

      router.refresh();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error(error, errorMessage);
    }
  };

  const handleOptimisticDeleteImage = (deletedImage: ImageCardType) => {
    setCoverImagesState((prev) => prev.filter((item) => item.id !== deletedImage.id));
    // Restore function
    return (errorMessage: string) => {
      setCoverImagesState((prev) => restoreItemInOrder(prev, deletedImage));
      setImageErrors((prev) => ({ ...prev, [deletedImage.id]: errorMessage }));
    };
  };

  return (
    <>
      <CoverPageSettings
        coverImageLimit={{ state: coverImageLimitState, set: setCoverImageLimitState }}
        coverTextLimit={{ state: coverTextLimitState, set: setCoverTextLimitState }}
        coverTextValues={{ state: coverTextValues, set: setCoverTextValues }}
      />
      <div className="flex flex-col justify-center items-center mt-10">
        <span>
          Anasayfada gösterilecek{" "}
          <span className="underline">limitleri, metinleri ve resim sırasını</span>{" "}
          değiştirdikten sonra kaydediniz.
        </span>

        <SubmitButton
          buttonName="Kaydet"
          pendingButtonName="Kaydediliyor..."
          type="button"
          className={`mt-6`}
          onClick={handleSave}
        />
      </div>

      <DndSortableGrid
        itemState={coverImagesState}
        setItemState={setCoverImagesState}
        initialItems={coverAlbumImages}
      >
        <div className="flex flex-wrap justify-center mt-12 gap-3">
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
    </>
  );
}
