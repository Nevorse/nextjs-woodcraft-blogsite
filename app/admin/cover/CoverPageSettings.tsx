"use client";
import AdminSelector from "@/components/ui/admin/AdminSelector";
import Input from "@/components/ui/form/Input";
import SubmitButton from "@/components/ui/form/SubmitButton";
import { CoverTextValues } from "./page";
import { useState } from "react";

type CoverPageSettingsProps = {
  initialCoverImageLimit: number | undefined;
  initialCoverTextLimit: number | undefined;
  initialCoverTexts?: CoverTextValues;
  handleSave: (
    coverImageLimit: number | undefined,
    coverTextLimit: number | undefined,
    coverTextValues: CoverTextValues,
  ) => Promise<void>;
};
export default function CoverPageSettings({
  initialCoverImageLimit,
  initialCoverTextLimit,
  initialCoverTexts = {},
  handleSave,
}: CoverPageSettingsProps) {
  const [coverImageLimitState, setCoverImageLimitState] = useState<number | undefined>(
    initialCoverImageLimit,
  );
  const [coverTextLimitState, setCoverTextLimitState] = useState<number | undefined>(
    initialCoverTextLimit,
  );
  const [coverTextValues, setCoverTextValues] = useState<CoverTextValues>(
    initialCoverTexts || {},
  );

  const handleInputChange = (index: string | number, value: string) => {
    setCoverTextValues((prev) => ({
      ...prev,
      [`content-${index}`]: value,
    }));
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-x-10">
        <div className="flex flex-col justify-center items-center my-8 gap-2 bg-(--theme-tertiary)/40 p-4 rounded-lg">
          <span>Kapak Fotoğrafı Limiti</span>
          <AdminSelector
            defaultValue={coverImageLimitState}
            onValueChange={(value) => setCoverImageLimitState(value)}
            selectorType="coverImageLimit"
          />
        </div>

        <div className="flex flex-col justify-center items-center my-8 gap-2 bg-(--theme-tertiary)/40 p-4 rounded-lg">
          <span>Kapak Metni Limiti</span>
          <AdminSelector
            defaultValue={coverTextLimitState}
            onValueChange={(value) => setCoverTextLimitState(value)}
            selectorType="coverTextLimit"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 max-w-200 w-full mx-auto">
        {Array.from({ length: coverTextLimitState || 1 }).map((_, index) => (
          <Input
            key={`cover-text-input-${index}`}
            value={coverTextValues[`content-${index}` as keyof CoverTextValues] || ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
            name={`content-${index}`}
            label={`Kapak Metni ${index + 1}`}
            placeholder={`Boş Metin`}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-3 mt-12">
        <span>
          Anasayfada gösterilecek{" "}
          <span className="underline">limitleri, metinleri ve resim sırasını</span> değiştirdikten sonra
          kaydediniz.
        </span>

        <SubmitButton
          buttonName="Kaydet"
          pendingButtonName="Kaydediliyor..."
          type="button"
          className={`bg-(--color-primary)!`}
          onClick={() =>
            handleSave(coverImageLimitState, coverTextLimitState, coverTextValues)
          }
        />
      </div>
    </div>
  );
}
