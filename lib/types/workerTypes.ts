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

export type WorkerDeleteResult = { ok: true; file: string } | { ok: false; file: string; error: string };

export type WorkerDeleteResponse =
  | {
      ok: true;
      action: "delete";
      deleted: number;
      results: WorkerDeleteResult[];
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
      results: WorkerDeleteResult[];
    }
  | {
      ok: false;
      error: string;
    };
