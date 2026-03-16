import { Injectable } from "@nestjs/common";
import { DefaultResult } from "src/core/alias/core.alias";
import { composeDefaultResponseResult, composePagingResponseResult } from "src/core/util/response.util";
import { StatusCodeUtil } from "src/core/util/status.code.util";
import { TaskRepository } from "../repository/task.repository";
import { TokenPayload } from "src/core/model/internal/token.payload.model";
import { TaskCreateRequest } from "src/core/model/request/task.create.request.model";
import { TaskEntity } from "src/core/entity/task.entity";
import { TaskConverter } from "../converter/task.converter";
import { ConverterUpdateInfo } from "src/core/model/internal/converter.update.info.model";
import { GetMyTasksResult, GetTaskResult, GetTaskResults } from "../alias/task.alias";
import { TaskQueryParamRequest } from "src/core/model/request/task.query.param.request.model";
import { PageInfo } from "src/core/model/page.info.model";
import { buildPageInfo } from "src/core/util/page.info.util";
import { PagingData } from "src/core/model/internal/paging.data";

@Injectable()
export class TaskService {
    constructor(
        private readonly taskRepository: TaskRepository,
    ) {}

    async createTask(request: TaskCreateRequest, tokenPayload: TokenPayload): Promise<DefaultResult> {
        if (!request) {
            return composeDefaultResponseResult(StatusCodeUtil.BAD_REQUEST);
        }

        const taskEntity: TaskEntity = TaskConverter.convertUpsertRequestToEntity(request, tokenPayload.userId);

        const createdTaskEntity: TaskEntity | null = await this.taskRepository.createTask(taskEntity);

        if (createdTaskEntity === null) {
            return composeDefaultResponseResult(StatusCodeUtil.INTERNAL_SERVER_ERROR);
        }

        return composeDefaultResponseResult(StatusCodeUtil.CREATED);
    }

    async getPagedTasks(queryParam: TaskQueryParamRequest): Promise<GetTaskResults> {
        const result: PagingData<TaskEntity> = await this.taskRepository.getAllTasks(queryParam);

        const tasks = TaskConverter.convertTaskEntitiesToModels(result.data);

        const pageInfo: PageInfo = buildPageInfo({
            requestPage: queryParam.page,
            requestLimit: queryParam.limit,
            totalCount: result.total
        });

        return composePagingResponseResult(StatusCodeUtil.OK, pageInfo, tasks);
    }

    async getMyTasks(tokenPayload: TokenPayload): Promise<GetMyTasksResult> {
        const taskEntities: TaskEntity[] = await this.taskRepository.getTasksByUserId(tokenPayload.userId);

        const tasks = TaskConverter.convertTaskEntitiesToModels(taskEntities);

        return composeDefaultResponseResult(StatusCodeUtil.OK, tasks);
    }

    async getTaskById(id: string): Promise<GetTaskResult> {
        const taskEntity: TaskEntity | null = await this.taskRepository.getTaskById(id);

        if (taskEntity === null) {
            return composeDefaultResponseResult(StatusCodeUtil.NOT_FOUND);
        }

        const task = TaskConverter.convertTaskEntityToModel(taskEntity);

        return composeDefaultResponseResult(StatusCodeUtil.OK, task);
    }

    async updateTaskById(id: string, request: TaskCreateRequest, tokenPayload: TokenPayload): Promise<DefaultResult> {
        if (!request) {
            return composeDefaultResponseResult(StatusCodeUtil.BAD_REQUEST);
        }
        
        const existingTask: TaskEntity | null = await this.taskRepository.getTaskById(id);

        if (existingTask === null) {
            return composeDefaultResponseResult(StatusCodeUtil.NOT_FOUND);
        }

        if (existingTask.userId !== tokenPayload.userId) {
            return composeDefaultResponseResult(StatusCodeUtil.FORBIDDEN);
        }

        const entityUpdateInfo: ConverterUpdateInfo<TaskEntity> = TaskConverter.convertUpsertRequestToEntityUpdate(
            request,
            existingTask
        );

        if (!entityUpdateInfo.hasDiff) {
            return composeDefaultResponseResult(StatusCodeUtil.OK);
        }

        const updateSuccess: boolean = await this.taskRepository.updateTaskById(existingTask.id, entityUpdateInfo.data);

        if (!updateSuccess) {
            return composeDefaultResponseResult(StatusCodeUtil.INTERNAL_SERVER_ERROR);
        }

        return composeDefaultResponseResult(StatusCodeUtil.OK);
    }

    async deleteTaskById(id: string, tokenPayload: TokenPayload): Promise<DefaultResult> {
        const taskEntity: TaskEntity | null = await this.taskRepository.getTaskById(id);

        if (taskEntity === null) {
            return composeDefaultResponseResult(StatusCodeUtil.NOT_FOUND);
        }

        if (taskEntity.userId !== tokenPayload.userId) {
            return composeDefaultResponseResult(StatusCodeUtil.FORBIDDEN);
        }

        const deleteSuccess: boolean = await this.taskRepository.deleteTaskById(id);

        if (!deleteSuccess) {
            return composeDefaultResponseResult(StatusCodeUtil.INTERNAL_SERVER_ERROR);
        }

        return composeDefaultResponseResult(StatusCodeUtil.OK);
    }
}