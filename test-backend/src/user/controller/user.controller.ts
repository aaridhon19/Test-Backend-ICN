import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { DefaultResult } from "src/core/alias/core.alias";
import { sendInternalServerErrorResponse, sendResponseByResult } from "src/core/util/response.util";
import { Request, Response } from "express";
import { UserService } from "../service/user.service";
import { UserCreateRequest } from "src/core/model/request/user.create.request.model";
import { GetUserResult, GetUserResults, LoginResult } from "../alias/user.alias";
import { UserLoginRequest } from "src/core/model/request/user.login.request.model";
import { GetMyTasksResult } from "src/task/alias/task.alias";
import { CoreSecurity } from "src/core/security/core.security";
import { TokenPayload } from "src/core/model/internal/token.payload.model";
import { parseUserInfo } from "src/core/util/request.util";

@Controller({
    path: "users"
})

export class UserController {
    private logger: Logger;

    constructor(private userService: UserService) {
        this.logger = new Logger(UserController.name);
    }

    @Post()
    createUser(
        @Body() requestBody: UserCreateRequest,
        @Res() response: Response
    ): void {
        const requestData: UserCreateRequest = plainToInstance(UserCreateRequest, requestBody, {
            enableImplicitConversion: true,
            enableCircularCheck: true
        });

        this.userService
            .createUser(requestData)
            .then((result: DefaultResult): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[POST /users] ${result.statusCode.message}`);
            })
            .catch((error): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error("[POST /users] Error", error);
            });
    }

    @Get()
    getPagedUsers(
        @Res() response: Response
    ): void {
        this.userService
            .getPagedUsers()
            .then((result: GetUserResults): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[GET /users] ${result.statusCode.message}`);
            })
            .catch((error): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error("[GET /users] Error", error);
            });
    }

    @Get("me")
    @UseGuards(CoreSecurity)
    getMyProfile(
        @Req() request: Request,
        @Res() response: Response
    ): void {
        const tokenPayload: TokenPayload = parseUserInfo(request);

        this.userService
            .getMyProfile(tokenPayload)
            .then((result: GetUserResult): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[GET /users/me] ${result.statusCode.message}`);
            })
            .catch((error): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error("[GET /users/me] Error", error);
            });
    }

    @Get(":id")
    getUserById(
        @Param("id") userId: string,
        @Res() response: Response
    ): void {
        this.userService
            .getUserById(userId)
            .then((result: GetUserResult): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[GET /users/${userId}] ${result.statusCode.message}`);
            })
            .catch((error: any): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error(`[GET /users/${userId}] Error`, error);
            });
    }

    @Put(":id")
    updateUser(
        @Param("id") userId: string,
        @Body() requestBody: UserCreateRequest,
        @Res() response: Response
    ): void {
        const requestData: UserCreateRequest = plainToInstance(UserCreateRequest, requestBody, {
            enableImplicitConversion: true
        });
        
        this.userService
            .updateUserById(userId, requestData)
            .then((result: DefaultResult): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[PUT /users/${userId}] ${result.statusCode.message}`);
            })
            .catch((error): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error(`[PUT /users/${userId}] Error`, error);
            });
    }

    @Delete(":id")
    deleteUserById(
        @Param("id") userId: string,
        @Res() response: Response
    ): void {
        this.userService
            .deleteUserById(userId)
            .then((result: DefaultResult): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[DELETE /users/${userId}] ${result.statusCode.message}`);
            })
            .catch((error): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error(`[DELETE /users/${userId}] Error`, error);
            });
    }

    @Post("login")
    loginUser(
        @Body() requestBody: UserLoginRequest,
        @Res() response: Response
    ): void {
        const requestData: UserLoginRequest = plainToInstance(UserLoginRequest, requestBody, {
            exposeDefaultValues: true
        });

        this.userService
            .loginUser(requestData)
            .then((result: LoginResult): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[POST /users/login] ${result.statusCode.message}`);
            })
            .catch((error): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error("[POST /users/login] Error", error);
            });
    }

    @Get(":id/tasks")
    getUserTasks(
        @Param("id") userId: string,
        @Res() response: Response
    ): void {
        this.userService
            .getUserTasks(userId)
            .then((result: GetMyTasksResult): void => {
                sendResponseByResult(response, result);
                this.logger.log(`[GET /users/${userId}/tasks] ${result.statusCode.message}`);
            })
            .catch((error): void => {
                sendInternalServerErrorResponse(response);
                this.logger.error(`[GET /users/${userId}/tasks] Error`, error);
            });
    }
}
