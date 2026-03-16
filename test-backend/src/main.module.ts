import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CoreSecurityModule } from "./core/security/module/core.security.module";
import { UserController } from "./user/controller/user.controller";
import { TaskController } from "./task/controller/task.controller";
import { UserModule } from "./user/module/user.module";
import { TaskModule } from "./task/module/task.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CoreSecurityModule,
        UserModule,
        TaskModule

    ],
    controllers: [
        UserController,
        TaskController
    ]
})
export class MainModule {}