import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/module/prisma.module";
import { userProvider } from "../provider/user.provider";
import { UserService } from "../service/user.service";
import { TaskModule } from "src/task/module/task.module";
import { TokenModule } from "src/token/module/token.module";

@Module({
    imports: [
        PrismaModule,
        TaskModule,
        TokenModule
    ],
    providers: [userProvider, UserService],
    exports: [userProvider, UserService]
})
export class UserModule {}
