"use client";

type AdminPageSettingsProps = {
  serviceAlbumLimit: number | undefined;
  projectAlbumLimit: number | undefined;
  isRegistrationOpen: boolean | undefined;
};

export default function AdminPageSettings({
  serviceAlbumLimit,
  projectAlbumLimit,
  isRegistrationOpen,
}: AdminPageSettingsProps) {


  return <div>AdminPageClient</div>;
}
