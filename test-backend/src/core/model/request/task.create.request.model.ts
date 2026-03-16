import { Expose } from "class-transformer";
import { TaskStatus } from "generated/prisma/enums";

export class TaskCreateRequest {
    @Expose({ name: "title" })
    title: string;

    @Expose({ name: "description" })
    description?: string;

    @Expose({ name: "status" })
    status?: TaskStatus;
}
