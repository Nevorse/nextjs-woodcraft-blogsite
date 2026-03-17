"use client";
import AdminSelector from "@/components/ui/admin/AdminSelector";
import Input from "@/components/ui/form/Input";
import SubmitButton from "@/components/ui/form/SubmitButton";
import { CoverTextValues } from "./page";

type CoverPageSettingsProps = {
  coverImageLimit: {
    state: number | undefined;
    set: React.Dispatch<React.SetStateAction<number | undefined>>;
  };
  coverTextLimit: {
    state: number | undefined;
    set: React.Dispatch<React.SetStateAction<number | undefined>>;
  };
  coverTextValues: {
    state: CoverTextValues;
    set: React.Dispatch<React.SetStateAction<CoverTextValues>>;
  };
};
export default function CoverPageSettings({
  coverImageLimit,
  coverTextLimit,
  coverTextValues,
}: CoverPageSettingsProps) {
  const handleInputChange = (index: string | number, value: string) => {
    coverTextValues.set((prev) => ({
      ...prev,
      [`content-${index}`]: value,
    }));
  };

  return (
    <div className="grid gap-12 mt-12">
      <div className="flex flex-wrap justify-center gap-x-10">
        <div className="flex flex-col justify-center items-centergap-2 bg-(--theme-tertiary)/40 p-4 rounded-lg">
          <span>Kapak Fotoğrafı Limiti</span>
          <AdminSelector
            defaultValue={coverImageLimit.state}
            onValueChange={(value) => coverImageLimit.set(value)}
            selectorType="coverImageLimit"
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-2 bg-(--theme-tertiary)/40 p-4 rounded-lg">
          <span>Kapak Metni Limiti</span>
          <AdminSelector
            defaultValue={coverTextLimit.state}
            onValueChange={(value) => coverTextLimit.set(value)}
            selectorType="coverTextLimit"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 max-w-200 w-full mx-auto">
        {Array.from({ length: coverTextLimit.state || 1 }).map((_, index) => (
          <Input
            key={`cover-text-input-${index}`}
            value={
              coverTextValues.state[`content-${index}` as keyof CoverTextValues] || ""
            }
            onChange={(e) => handleInputChange(index, e.target.value)}
            name={`content-${index}`}
            label={`Kapak Metni ${index + 1}`}
            placeholder={`Boş Metin`}
          />
        ))}
      </div>
    </div>
  );
}
