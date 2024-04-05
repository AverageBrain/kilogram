import {prisma} from "../domain/PrismaClient";
import {User} from "@prisma/client";

export class UserService {
    async getOrCreateUserByGithub(githubId: string, name: string, username: string): Promise<User> {
        const user = await prisma.user.findUnique({where: {githubId: githubId}})
        if (user == null) {
            return prisma.user.create({data: {username: username, githubId: githubId, name: name}});
        }
        return user
    }

    async getUserById(userId: number): Promise<User | null> {
        return prisma.user.findUnique({where: {id: userId}})
    }
}