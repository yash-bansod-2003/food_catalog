export interface Payload {
  fileName: string;
}

export interface FileStorage {
  getPresignedUrl(payload: Payload): Promise<string>;
  delete(key: string): Promise<void>;
}
