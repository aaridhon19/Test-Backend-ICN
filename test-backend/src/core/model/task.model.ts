import { Expose, Type } from "class-transformer";
import { User } from "./user.model";

export class Task {
    @Expose({ name: "id" })
    id: string;

    @Expose({ name: "user_id" })
    userId: string;

    @Expose({ name: "title" })
    title: string;

    @Expose({ name: "description" })
    description: string | null;

    @Expose({ name: "status" })
    status: string;

    @Expose({ name: "created_at" })
    @Type(() => Number)
    createdAt: bigint;

    @Expose({ name: "updated_at" })
    @Type(() => Number)
    updatedAt?: bigint | null;

    @Expose({ name: "user"})
    user: User | null;

    constructor(data?: Partial<Task>) {
        Object.assign(this, data);
    }
}
