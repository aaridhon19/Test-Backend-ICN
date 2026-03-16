import { TaskStatus } from "generated/prisma/enums";
import { UserInternalEntity } from "./user.internal.entity";

export class TaskInternalEntity {
    id: string;
    user_id: string;
    title: string;
    description?: string | null
    status: TaskStatus;
    created_at: bigint;
    updated_at?: bigint | null;
    user?: UserInternalEntity;
}
