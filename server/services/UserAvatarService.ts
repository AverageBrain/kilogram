import Identicon, {IdenticonOptions} from "identicon.js";
import {FileStorageService} from "./FileStorageService";
import crypto from "crypto";
import {prisma} from "../domain/PrismaClient";
import {FileInfo} from "../models/FileInfo";

export class UserAvatarService {
    /**
     * Function adds avatar to user or generates it based on the identicon and saves it to local storage
     *
     * @param id - id of user, used to generate avatar
     * @param [avatarFile] - avatar file
     * @returns {Promise<string | null>} Name of avatar, if successfully created, or null, if not
     */
    static async createAvatar(id: string, avatarFile?: FileInfo): Promise<string | null> {
        try {
            const idAsNumber = Number(id)
            const fileInfo: FileInfo = avatarFile ??
                {data: this.generate(idAsNumber), name: `dump.svg`, mimetype: 'image/svg+xml'}
            const fileName = await FileStorageService.uploadImage(fileInfo)
            const localUser = await prisma.user.findUnique({where: {id: idAsNumber}})

            if (localUser !== null) {
                await prisma.user.update({where: {id: idAsNumber}, data: {avatarKey: fileName}})
            }

            return fileName
        } catch (error) {
            console.error(`Не удалось создать аватар для пользователя с id=${id}: ${error}`)
            return null
        }
    }

    /**
     * Function gets user's avatar link from local storage
     *
     * @param id - id of user
     * @returns Presigned url of file, saved in the S3
     */
    static async getAvatar(id: string): Promise<string | null> {
        const idAsNumber = Number(id)
        const localUser = await prisma.user.findUniqueOrThrow({where: {id: idAsNumber}})

        if (localUser.avatarKey === null) {
            const avatarName = await this.createAvatar(id)
            return avatarName === null ? null : FileStorageService.getFilePresignedUrl(avatarName)
        }

        return FileStorageService.getFilePresignedUrl(localUser.avatarKey)
    }

    private static generate(key: number): Buffer {
        const options: IdenticonOptions = {
            size: 300,
            format: 'svg'
        }
        const hash = crypto.createHash('sha256').update(key.toString()).digest('hex')

        return Buffer.from(new Identicon(hash, options).render().getDump())
    }
}