import { TaskStatus } from "generated/prisma/enums";
import { TaskInternalEntity } from "./task.internal.entity";
import { UserEntity } from "./user.entity";

export class TaskEntity {
    id: string;
    userId: string;
    title: string;
    description?: string | null
    status: TaskStatus;
    createdAt: bigint;
    updatedAt?: bigint | null;
    user?: UserEntity;

    constructor(data?: Partial<Omit<TaskEntity, "fromTaskInternalEntity">>) {
        if (data) {
            this.id = data.id!;
            this.userId = data.userId!;
            this.title = data.title!;
            this.description = data.description;
            this.status = data.status!;
            this.createdAt = data.createdAt!;
            this.updatedAt = data.updatedAt;
        }
    }

    fromTaskInternalEntity(data: TaskInternalEntity): TaskEntity {
        this.id = data.id;
        this.userId = data.user_id;
        this.title = data.title;
        this.description = data.description;
        this.status = data.status;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
        this.createdAt = data.created_at;
        this.user = data.user ? new UserEntity().fromUserInternalEntity(data.user) : undefined;

        return this;
    }
}
