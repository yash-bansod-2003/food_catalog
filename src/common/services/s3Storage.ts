import { FileStorage, Payload } from "@/common/types/storage.js";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import configuration from "@/config/configuration.js";

class S3Storage implements FileStorage {
  private readonly client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: configuration.aws.region,
      credentials: {
        accessKeyId: configuration.aws.accessKeyId,
        secretAccessKey: configuration.aws.secretAccessKey,
      },
    });
  }

  private createPresignedUrl(key: string) {
    const command = new PutObjectCommand({
      Bucket: configuration.aws.bucket,
      Key: key,
    });
    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  }

  async getPresignedUrl(payload: Payload): Promise<string> {
    return await this.createPresignedUrl(payload.fileName);
  }

  async delete(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: configuration.aws.bucket,
      Key: key,
    });
    await this.client.send(command);
  }
}

export default S3Storage;
