import { TaskInternalEntity } from "./task.internal.entity";

export class UserInternalEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: bigint;
    updated_at?: bigint | null;
    tasks?: TaskInternalEntity[] | null;
}
