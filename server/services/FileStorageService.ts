import {GetObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import crypto from "crypto";

export class FileStorageService {
    private static storageUrl = 'https://storage.yandexcloud.net'
    private static bucketName = 'team1'
    private static s3Client = new S3Client({
        region: 'us-east-1',
        endpoint: this.storageUrl,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        }
    })

    static async uploadFile(data: Buffer, format: string): Promise<string> {
        const generatedUuid = crypto.randomUUID()
        const key =  `${generatedUuid}.${format}`
        const uploadParams = {
            Bucket: this.bucketName,
            Key: key,
            Body: data,
        }

        try {
            const uploadCommand = new PutObjectCommand(uploadParams)
            await this.s3Client.send(uploadCommand)
            console.log("Файл успешно загружен в S3:", key)

            return key
        } catch (error) {
            console.error("Ошибка при загрузке файла в S3:", error)
            throw error
        }
    }

    static async getFileAsString(name: string): Promise<string> {
        const getParams = {
            Bucket: this.bucketName,
            Key: name
        }

        try {
            const getCommand = new GetObjectCommand(getParams)
            const result = await this.s3Client.send(getCommand)

            if (result.Body === undefined) throw new Error('Тело ответа не определено')

            return result.Body.transformToString('base64')
        } catch (error) {
            console.error("Ошибка при получении файла из S3:", error)
            throw error
        }
    }
}