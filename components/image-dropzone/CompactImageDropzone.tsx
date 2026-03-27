

export type FilePreview = {
  id: string;
  file: File;
  preview: string;
  status: "idle" | "uploading" | "error" | "done";
  fileName?: string;
  fileUuid?: string;
  error?: string;
};

type UploadType = "services" | "projects";

type CompactDropzoneProps = {
  xType: UploadType;
  parentId: string | undefined;
  parentFolderId?: string | undefined;
};

export default function CompactImageDropzone({
    xType,
    parentId,
    parentFolderId
}: CompactDropzoneProps) {
  return (
    <div>CompactImageDropzone</div>
  )
}
