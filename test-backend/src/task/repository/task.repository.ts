import { TaskEntity } from "src/core/entity/task.entity";
import { TaskQueryParamRequest } from "src/core/model/request/task.query.param.request.model";
import { PagingData } from '../../core/model/internal/paging.data';

export abstract class TaskRepository {
    abstract createTask(entity: TaskEntity): Promise<TaskEntity | null>;
    abstract getAllTasks(queryParam: TaskQueryParamRequest): Promise<PagingData<TaskEntity>>;
    abstract getTaskById(id: string): Promise<TaskEntity | null>;
    abstract getTasksByUserId(userId: string): Promise<TaskEntity[]>;
    abstract updateTaskById(id: string, entity: TaskEntity): Promise<boolean>;
    abstract deleteTaskById(id: string): Promise<boolean>;
}
