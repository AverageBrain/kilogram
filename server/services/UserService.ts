import {User} from "@prisma/client";
import {prisma} from "../domain/PrismaClient";

export class UserService {
    async getOrCreateUserByGithub(githubId: string, name: string, username: string): Promise<User> {
        console.log("getOrCreateUserByGithub")
        const user = await prisma.user.findUnique({where: {githubId: githubId}})
        if (user == null) {
            return prisma.user.create({data: {username: username, githubId: githubId, name: name}});
        }
        return user
    }
}