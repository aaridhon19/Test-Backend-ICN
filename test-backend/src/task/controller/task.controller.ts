import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { DefaultResult } from "src/core/alias/core.alias";
import { sendInternalServerErrorResponse, sendResponseByResult } from "src/core/util/response.util";
import { Request, Response } from "express";
import { CoreSecurity } from "src/core/security/core.security";
import { TokenPayload } from "src/core/model/internal/token.payload.model";
import { parseUserInfo } from "src/core/util/request.util";
import { TaskService } from "../service/task.service";
import { TaskCreateRequest } from "src/core/model/request/task.create.request.model";
import { TaskQueryParamRequest } from "src/core/model/request/task.query.param.request.model";
import { GetMyTasksResult, GetTaskResult, GetTaskResults } from "../alias/task.alias";

@Controller({
    path: "tasks"
})

export class TaskController {
    private logger: Logger;

    constructor(private taskService: TaskService) {
        this.logger = new Logger(TaskController.name);
    }

    @Post()
    @UseGuards(CoreSecurity)
    createTask(
        @Body() requestBody: TaskCreateRequest,
        @Req() request: Request,
        @Res() response: Response
    ): void {
        const tokenPayload: TokenPayload = parseUserInfo(request);

        const requestData: TaskCreateRequest = plainToInstance(TaskCreateRequest, requestBody, {
            enableImplicitConversion: true,
            enableCircularCheck: true
        });

        this.taskService
            .createTask(requestData, tokenPayload)
            .then((result: DefaultResult): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[POST /tasks] ${result.statusCode.message}`);
            })
            .catch((error: any): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error("[POST /tasks] Error", error);
            });
    }

    @Get()
    getPagedTasks(
        @Query() query: TaskQueryParamRequest,
        @Res() response: Response
    ): void {
        const queryParam: TaskQueryParamRequest = plainToInstance(TaskQueryParamRequest, query, {
            exposeDefaultValues: true,
            enableImplicitConversion: true
        });

        this.taskService
            .getPagedTasks(queryParam)
            .then((result: GetTaskResults): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[GET /tasks] ${result.statusCode.message}`);
            })
            .catch((error): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error("[GET /tasks] Error", error);
            });
    }

    @Get("my-tasks")
    @UseGuards(CoreSecurity)
    getMyTasks(
        @Req() request: Request,
        @Res() response: Response
    ): void {
        const tokenPayload: TokenPayload = parseUserInfo(request);

        this.taskService
            .getMyTasks(tokenPayload)
            .then((result: GetMyTasksResult): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[GET /tasks/my-tasks] ${result.statusCode.message}`);
            })
            .catch((error): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error("[GET /tasks/my-tasks] Error", error);
            });
    }

    @Get(":id")
    getTaskById(
        @Param("id") id: string,
        @Res() response: Response
    ): void {
        this.taskService
            .getTaskById(id)
            .then((result: GetTaskResult): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[GET /tasks/:id] ${result.statusCode.message}`);
            })
            .catch((error): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error("[GET /tasks/:id] Error", error);
            });
    }

    @Put(":id")
    @UseGuards(CoreSecurity)
    updateTask(
        @Param("id") id: string,
        @Body() requestBody: TaskCreateRequest,
        @Req() request: Request,
        @Res() response: Response
    ): void {
        const tokenPayload: TokenPayload = parseUserInfo(request);

        const requestData: TaskCreateRequest = plainToInstance(TaskCreateRequest, requestBody, {
            enableImplicitConversion: true,
            enableCircularCheck: true
        });

        this.taskService
            .updateTaskById(id, requestData, tokenPayload)
            .then((result: DefaultResult): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[PUT /tasks/:id] ${result.statusCode.message}`);
            })
            .catch((error): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error("[PUT /tasks/:id] Error", error);
            });
    }

    @Delete(":id")
    @UseGuards(CoreSecurity)
    deleteTask(
        @Param("id") id: string,
        @Req() request: Request,
        @Res() response: Response
    ): void {
        const tokenPayload: TokenPayload = parseUserInfo(request);

        this.taskService
            .deleteTaskById(id, tokenPayload)
            .then((result: DefaultResult): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[DELETE /tasks/:id] ${result.statusCode.message}`);
            })
            .catch((error): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error("[DELETE /tasks/:id] Error", error);
            });
    }
}