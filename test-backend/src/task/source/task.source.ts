import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/service/prisma.service";
import { TaskRepository } from "../repository/task.repository";
import { TaskEntity } from "src/core/entity/task.entity";
import { TaskInternalEntity } from "src/core/entity/task.internal.entity";
import { TaskQueryParamRequest } from "src/core/model/request/task.query.param.request.model";
import { PagingData } from "src/core/model/internal/paging.data";

@Injectable()
export class TaskSource extends TaskRepository {
    private logger = new Logger(TaskSource.name);
    constructor(private readonly prismaService: PrismaService) {
        super();
    }

    async createTask(entity: TaskEntity): Promise<TaskEntity | null> {
        try {
            const createTaskResult: TaskInternalEntity = await this.prismaService.task.create({
                data: {
                    title: entity.title,
                    user_id: entity.userId,
                    description: entity.description,
                    status: entity.status,
                    created_at: entity.createdAt
                }
            });

            return new TaskEntity().fromTaskInternalEntity(createTaskResult);
        } catch (error) {
            this.logger.error("createTask: Error", error);
            return null;
        }
    }

    async getAllTasks(queryParam: TaskQueryParamRequest): Promise<PagingData<TaskEntity>> {
        try {
            const taskInternalEntities: TaskInternalEntity[] =
                await this.prismaService.task.findMany(
                    {
                        skip: (queryParam.page - 1) * queryParam.limit,
                        take: queryParam.limit,
                        orderBy: {
                            created_at: "desc"
                        },
                        include: {
                            user: true
                        }
                    }
                );

            return {
                data: taskInternalEntities.map((entity: TaskInternalEntity) =>
                    new TaskEntity().fromTaskInternalEntity(entity)
                ),
                total: taskInternalEntities.length
            };
        } catch (error) {
            this.logger.error("Get all tasks failed", error);
            return {
                data: [],
                total: 0
            };
        }
    }

    async getTaskById(id: string): Promise<TaskEntity | null> {
        try {
            const taskInternalEntity: TaskInternalEntity | null =
                await this.prismaService.task.findUnique({
                    where: { id: id }
                });

            if (taskInternalEntity === null) {
                return null;
            }

            return new TaskEntity().fromTaskInternalEntity(taskInternalEntity);
        } catch (error) {
            this.logger.error("getTaskById: error", error);
            return null;
        }
    }

    async getTasksByUserId(userId: string): Promise<TaskEntity[]> {
        try {
            const taskInternalEntities: TaskInternalEntity[] =
                await this.prismaService.task.findMany({
                    where: { user_id: userId }
                });

            return taskInternalEntities.map((entity: TaskInternalEntity) =>
                new TaskEntity().fromTaskInternalEntity(entity)
            );
        } catch (error) {
            this.logger.error("getTasksByUserId: error", error);
            return [];
        }
    }

    async updateTaskById(id: string, entity: TaskEntity): Promise<boolean> {
        try {
            const updateResult = await this.prismaService.task.update({
                where: { id: id },
                data: {
                    title: entity.title,
                    description: entity.description,
                    status: entity.status,
                    updated_at: entity.updatedAt
                }
            });

            return updateResult !== null;
        } catch (error) {
            this.logger.error("updateTaskById: error", error);
            return false;
        }
    }

    async deleteTaskById(id: string): Promise<boolean> {
        try {
            const deleteResult = await this.prismaService.task.delete({
                where: { id: id }
            });

            return deleteResult !== null;
        } catch (error) {
            this.logger.error("deleteTaskById: error", error);
            return false;
        }
    }
}
