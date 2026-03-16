import { PrismaService } from "src/prisma/service/prisma.service";
import { UserRepository } from "../repository/user.repository";
import { UserSource } from "../source/user.source";

export const userProvider = {
    provide: UserRepository,
    useFactory: (prismaService: PrismaService) => new UserSource(prismaService),
    inject: [PrismaService]
};
