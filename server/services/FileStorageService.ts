import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import path, { ParsedPath } from 'path';
import iconv from 'iconv-lite';
import { FileInfo } from '../models/FileInfo';

function convertKeyToName(fileKey: string): string {
  const fileKeySplitted = fileKey.split('.');
  fileKeySplitted.splice(-2, 1);
  const encodedFileName = iconv.encode(decodeURI(fileKeySplitted.join('.')), 'binary');

  return iconv.decode(encodedFileName, 'utf8');
}

export class FileStorageService {
  private static storageUrl = 'https://storage.yandexcloud.net';

  private static bucketName = 'team1';

  private static s3Client = new S3Client({
    region: 'us-east-1',
    endpoint: this.storageUrl,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  private static FILE_EXPIRATION_TIME = 60 * 60 * 2; // 2 hours

  private static DEFAULT_OUTPUT_CONTENT_TYPE = 'application/octet-stream';

  private static allowedMimetypes = ['image', 'video', 'audio', 'text/plain', 'application/pdf', 'application/zip'];

  private static contentTypeByExtension = new Map<string, string>([
    ['.svg', 'image/svg+xml'],
    ['.gif', 'image/gif'],
    ['.jpeg', 'image/jpeg'],
    ['.jpg', 'image/jpeg'],
    ['.png', 'image/png'],
    ['.webp', 'image/webp'],
    ['.ico', 'image/vnd.microsoft.ico'],
    ['.mp3', 'audio/mpeg'],
    ['.mp4', 'video/mp4'],
    ['.webm', 'video/webm'],
    ['.avi', 'video/x-msvideo'],
  ]);

  static {}

  static async uploadImage(file: FileInfo): Promise<string> {
    if (this.baseMimetype(file) !== 'image') throw Error('Недопустимый формат изображения!');

    return this.uploadFile(file);
  }

  static async uploadFile(file: FileInfo): Promise<string> {
    if (![file.mimetype, this.baseMimetype(file)].some((mimetype) => this.allowedMimetypes.includes(mimetype))) {
      throw Error('Недопустимый формат файла!');
    }

    return this.uploadFileData(file.data, file.name);
  }

  private static async uploadFileData(data: Buffer, fileName: string): Promise<string> {
    const generatedUuid = crypto.randomUUID();
    const fileNameParts: ParsedPath = path.parse(fileName);
    const key = `${fileNameParts.name}.${generatedUuid}${fileNameParts.ext}`;
    const uploadParams = {
      Bucket: this.bucketName,
      Key: key,
      Body: data,
    };

    try {
      const uploadCommand = new PutObjectCommand(uploadParams);
      await this.s3Client.send(uploadCommand);

      return key;
    } catch (error) {
      console.warn('Ошибка при загрузке файла в S3:', error);
      throw error;
    }
  }

  static async getFilePresignedUrl(fileKey: string): Promise<string> {
    const fileName = convertKeyToName(fileKey);
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
      ResponseContentType: this.getContentTypeByExtension(path.extname(fileName)),
      ResponseContentDisposition: `attachment; filename="${fileName}"`,
    };

    try {
      const command = new GetObjectCommand(params);

      return await getSignedUrl(this.s3Client, command, { expiresIn: this.FILE_EXPIRATION_TIME });
    } catch (error) {
      console.warn('Ошибка при получении файла из S3:', error);
      throw error;
    }
  }

  private static baseMimetype(file: FileInfo): string {
    return file.mimetype.split('/')[0];
  }

  private static getContentTypeByExtension(extension: string): string {
    if (!this.contentTypeByExtension.has(extension)) return this.DEFAULT_OUTPUT_CONTENT_TYPE;

    return this.contentTypeByExtension.get(extension) as string;
  }
}
