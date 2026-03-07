"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AdminSelectorProps = {
  onValueChange: (value: number) => void;
  defaultValue?: number;
  selectorType?:
    | "coverImageLimit"
    | "coverTextLimit"
    | "projectAlbumLimit"
    | "serviceAlbumLimit";
  };

export default function AdminSelector({
  defaultValue,
  onValueChange,
  selectorType,
}: AdminSelectorProps) {
  return (
    <Select
      defaultValue={defaultValue != null ? defaultValue.toString() : undefined}
      onValueChange={(val) => onValueChange(Number(val))}
    >
      <SelectTrigger className="w-30 border-(--theme-tertiary)">
        <SelectValue placeholder="Seçiniz" />
      </SelectTrigger>
      <SelectContent className="bg-(--theme-primary)">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <SelectItem key={`SelectItem-${selectorType}-${num}`} value={num.toString()}>
            {num}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
