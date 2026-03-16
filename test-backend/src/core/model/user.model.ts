import { Expose, Type } from "class-transformer";
import { Task } from "./task.model";

export class User {
    @Expose({ name: "id" })
    id: string;

    @Expose({ name: "name" })
    name: string;

    @Expose({ name: "email" })
    email: string;

    @Expose({ name: "password" })
    password: string;

    @Expose({ name: "created_at" })
    @Type(() => Number)
    createdAt: bigint;

    @Expose({ name: "updated_at" })
    @Type(() => Number)
    updatedAt?: bigint | null;

    @Expose({ name: "tasks" })
    tasks?: Task[] | null;

    constructor(data?: Partial<User>) {
        Object.assign(this, data);
    }
}
