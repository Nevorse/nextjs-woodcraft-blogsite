import { AlbumWithRelations } from "@/lib/database/album";

type ProjectAlbumClientProps = {
  projectData: AlbumWithRelations;
};
export default function AdminProjectAlbumClient(projectData: ProjectAlbumClientProps) {
  return <div>AdminProjectAlbumClient</div>;
}
