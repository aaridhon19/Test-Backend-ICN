import { TaskStatus } from "generated/prisma/enums";
import { TaskEntity } from "src/core/entity/task.entity";
import { ConverterUpdateInfo } from "src/core/model/internal/converter.update.info.model";
import { TaskCreateRequest } from "src/core/model/request/task.create.request.model";
import { Task } from "src/core/model/task.model";
import { compareStringIsDiff } from "src/core/util/helper.util";
import { UserConverter } from "src/user/converter/user.converter";

export class TaskConverter {
    static convertUpsertRequestToEntity(request: TaskCreateRequest, userId: string): TaskEntity {
        return new TaskEntity({
            id: "",
            userId: userId,
            title: request.title,
            description: request.description,
            status: request.status ? request.status as TaskStatus : TaskStatus.PENDING,
            createdAt: BigInt(Date.now())
        });
    }

    static convertUpsertRequestToEntityUpdate(
        request: TaskCreateRequest,
        currentEntity: TaskEntity
    ): ConverterUpdateInfo<TaskEntity> {
        let hasDiff: boolean = false;

        if (compareStringIsDiff(currentEntity.title, request.title)) {
            currentEntity.title = request.title;
            hasDiff = true;
        }

        if(compareStringIsDiff(currentEntity.description, request.description)) {
            currentEntity.description = request.description;
            hasDiff = true;
        }

        if (compareStringIsDiff(currentEntity.status, request.status)) {
            currentEntity.status = request.status as TaskStatus;
            hasDiff = true;
        }

        if (hasDiff) {
            currentEntity.updatedAt = BigInt(Date.now());
        }

        return new ConverterUpdateInfo({
            hasDiff: hasDiff,
            data: currentEntity
        });
    }

    static convertTaskEntitiesToModels(entities: TaskEntity[]): Task[] {
        return entities.map(
            (entity: TaskEntity): Task => this.convertTaskEntityToModel(entity)
        );
    }

    static convertTaskEntityToModel(entity: TaskEntity): Task {
        return new Task({
            id: entity.id,
            userId: entity.userId,
            title: entity.title,
            description: entity.description,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            user: entity.user ? UserConverter.convertUserEntityToModel(entity.user) : null
        });
    }
}