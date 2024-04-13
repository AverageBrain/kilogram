import Identicon, {IdenticonOptions} from "identicon.js";
import {FileStorageService} from "./FileStorageService";
import crypto from "crypto";
import {prisma} from "../domain/PrismaClient";
import {UploadedFile} from "express-fileupload";

export class UserAvatarService {
    private static mimetypeToFormat = new Map([
        ['image/jpeg', 'jpeg'],
        ['image/png', 'png'],
        ['image/svg+xml', 'svg'],
        ['image/webp', 'webp'],
        ['image/gif', 'gif'],
    ])

    /**
     * Function adds avatar to user or generates it based on the identicon and saves it to local storage
     *
     * @param userName - name of user, used to generate avatar
     * @param [avatarFile] - avatar file
     * @returns {Promise<string | null>} Name of avatar, if successfully created, or null, if not
     */
    static async createAvatar(userName: string, avatarFile?: UploadedFile): Promise<string | null> {
        try {
            let fileName

            if (avatarFile === undefined) {
                const identicon = this.generate(userName.toString())
                const bufferedIdenticon = Buffer.from(identicon.render().getBase64(), 'base64')

                fileName = await FileStorageService.uploadFile(bufferedIdenticon, 'svg')
            } else {
                if (!this.mimetypeToFormat.has(avatarFile.mimetype))
                    throw Error('Недопустимый тип аватара! Используйте png, jpeg, gif, svg или webp.')
                fileName = await FileStorageService.uploadFile(
                    Buffer.from(avatarFile.data.toString('base64')),
                    this.mimetypeToFormat.get(avatarFile.mimetype)!
                )
            }
            const localUser = await prisma.user.findUnique({where: {username: userName}})

            if (localUser !== null) {
                await prisma.user.update({where: {username: userName}, data: {avatarKey: fileName}})
            }

            return fileName
        } catch (error) {
            console.error(error)
            console.error(`Не удалось создать аватар для пользователя с username=${userName}`)
            return null
        }
    }

    /**
     * Function gets user's avatar from local storage
     *
     * @param username - name of user
     * @returns Base64 encoded svg file, saved in the S3
     */
    static async getAvatar(username: string): Promise<string> {
        const localUser = await prisma.user.findUniqueOrThrow({where: {username: username}})

        if (localUser.avatarKey === null) throw new Error(`Пользователь с username=${username} не имеет аватара`)

        return FileStorageService.getFileAsString(localUser.avatarKey)
    }

    private static generate(key: string): Identicon {
        const options: IdenticonOptions = {
            size: 300,
            format: 'svg'
        }
        const hash = crypto.createHash('sha256').update(key).digest('hex')

        return new Identicon(hash, options)
    }
}