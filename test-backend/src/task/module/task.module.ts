import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/module/prisma.module";
import { taskProvider } from "../provider/task.provider";
import { TaskService } from "../service/task.service";

@Module({
    imports: [PrismaModule],
    providers: [taskProvider, TaskService],
    exports: [taskProvider, TaskService]
})
export class TaskModule {}
