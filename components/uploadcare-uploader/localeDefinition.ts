type LocaleName = string;
type LocaleDefinition = Record<string, string>;
type LocaleDefinitionOverride = Record<LocaleName, LocaleDefinition>;

export const localeDefinitionOverride: LocaleDefinitionOverride = {
  en: {
    "upload-files": "Dosyaları Yükle",
    "drop-files-here": "Dosyaları Buraya Bırak",
    cancel: "İptal",
    "start-from-cancel": "İptal",
    clear: "Temizle",
    "add-more": "Daha Fazla Ekle",
    done: "Bitti",
    no: "Hayır",
    yes: "Evet",
    back: "Geri",
    ok: "Tamam",
    selected: "Seçilen",
    upload: "Yükle",
    "src-type-local": "Cihazdan",
    "src-type-from-url": "Bağlantıdan",
  },
};
