// Worker-related types
export type WorkerUploadResponse =
  | {
      ok: true;
      action: "upload";
      file: string;
      used: number;
      limit: number;
    }
  | {
      ok: false;
      error: string;
    };

export type WorkerBulkDeleteResponse =
  | {
      ok: true;
      prefix: string;
      action: "delete";
      deleted: number;
      results: { ok: true; file: string } | { ok: false; file: string; error: string }[];
    }
  | {
      ok: false;
      error: string;
    };
