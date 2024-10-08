import {prisma} from "../domain/PrismaClient";
import {User} from "@prisma/client";
import {UserAvatarService} from "./UserAvatarService";

export class UserService {
    async getOrCreateUserByGithub(githubId: string, name: string | null, username: string): Promise<User> {
        const user = await prisma.user.findUnique({where: {githubId: githubId}})
        if (user == null) {
            const avatarKey = await UserAvatarService.createAvatar(username)

            if (avatarKey === null) throw Error("Не удалось создать аватар для нового пользователя - повторите попытку")

            return prisma.user.create({
                data: {
                    username: username,
                    githubId: githubId,
                    name: name == null ? username : name,
                    avatarKey: avatarKey
                }
            });
        }

        return user
    }

    async getUserById(userId: number): Promise<User | null> {
        return prisma.user.findUnique({where: {id: userId}})
    }

    async getUsersById(usersId: number[]): Promise<User[]> {
        return prisma.user.findMany({where: {id: {in: usersId}}})
    }

}