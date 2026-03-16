import { TaskEntity } from './task.entity';
import { UserInternalEntity } from './user.internal.entity';

export class UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: bigint;
    updatedAt?: bigint | null;
    taskEntities?: TaskEntity[] | null;

    constructor(data?: Partial<Omit<UserEntity, "fromUserInternalEntity">>) {
        if (data) {
            this.id = data.id!;
            this.name = data.name!;
            this.email = data.email!;
            this.password = data.password!;
            this.createdAt = data.createdAt!;
            this.updatedAt = data.updatedAt;
            this.taskEntities = data.taskEntities;
        }
    }

    fromUserInternalEntity(data: UserInternalEntity): UserEntity {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
        return this;
    }
}
