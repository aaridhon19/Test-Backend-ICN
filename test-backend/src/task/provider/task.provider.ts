import { PrismaService } from "src/prisma/service/prisma.service";
import { TaskRepository } from "../repository/task.repository";
import { TaskSource } from "../source/task.source";

export const taskProvider = {
    provide: TaskRepository,
    useFactory: (prismaService: PrismaService) => new TaskSource(prismaService),
    inject: [PrismaService]
};
