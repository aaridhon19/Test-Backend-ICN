import { Injectable } from "@nestjs/common";
import { DefaultResult } from "src/core/alias/core.alias";
import { composeDefaultResponseResult } from "src/core/util/response.util";
import { StatusCodeUtil } from "src/core/util/status.code.util";
import { TokenPayload } from "src/core/model/internal/token.payload.model";
import { UserCreateRequest } from "src/core/model/request/user.create.request.model";
import { UserRepository } from "../repository/user.repository";
import { UserEntity } from "src/core/entity/user.entity";
import { UserConverter } from "../converter/user.converter";
import { hash, compare } from "bcrypt";
import { GetUserResult, GetUserResults, LoginResult } from "../alias/user.alias";
import { ConverterUpdateInfo } from "src/core/model/internal/converter.update.info.model";
import { UserLoginRequest } from "src/core/model/request/user.login.request.model";
import { checkStringIsAvailable } from "src/core/util/helper.util";
import { TaskRepository } from "src/task/repository/task.repository";
import { TaskEntity } from "src/core/entity/task.entity";
import { TaskConverter } from "src/task/converter/task.converter";
import { TokenRepository } from "src/token/repository/token.repository";
import { Credential } from "src/core/model/credential.model";
import { GetMyTasksResult } from "src/task/alias/task.alias";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly taskRepository: TaskRepository,
        private readonly tokenRepository: TokenRepository
    ) {}

    async createUser(request: UserCreateRequest): Promise<DefaultResult> {
        const currentUser: UserEntity | null = await this.userRepository.getUserByEmail(
            request.email
        );

        if (currentUser !== null) {
            return composeDefaultResponseResult(StatusCodeUtil.CONFLICT);
        }

        const userEntity: UserEntity = UserConverter.convertUpsertRequestToEntity(request);
        userEntity.password = await hash(userEntity.password ?? request.password, 12);

        const createdUserEntity: UserEntity = await this.userRepository.createUser(userEntity);

        if (createdUserEntity === undefined) {
            return composeDefaultResponseResult(StatusCodeUtil.INTERNAL_SERVER_ERROR);
        }

        return composeDefaultResponseResult(StatusCodeUtil.CREATED);
    }

    async getPagedUsers(): Promise<GetUserResults> {
        const userEntities: UserEntity[] = await this.userRepository.getAllUsers();

        const users = UserConverter.convertUserEntitiesToModels(userEntities);

        return composeDefaultResponseResult(StatusCodeUtil.OK, users);
    }

    async getMyProfile(tokenPayload: TokenPayload): Promise<GetUserResult> {
        const userEntity: UserEntity | null = await this.userRepository.getUserById(tokenPayload.userId);

        if (userEntity === null) {
            return composeDefaultResponseResult(StatusCodeUtil.NOT_FOUND);
        }

        const user = UserConverter.convertUserEntityToModel(userEntity);

        return composeDefaultResponseResult(StatusCodeUtil.OK, user);
    }

    async getUserById(userId: string): Promise<GetUserResult> {
        const userEntity: UserEntity | null = await this.userRepository.getUserById(userId);

        if (userEntity === null) {
            return composeDefaultResponseResult(StatusCodeUtil.NOT_FOUND);
        }

        const user = UserConverter.convertUserEntityToModel(userEntity);

        return composeDefaultResponseResult(StatusCodeUtil.OK, user);
    }

    async updateUserById(userId: string, request: UserCreateRequest): Promise<DefaultResult> {
        if (!request) {
            return composeDefaultResponseResult(StatusCodeUtil.BAD_REQUEST);
        }

        const existingUser: UserEntity | null = await this.userRepository.getUserById(userId);

        if (existingUser === null) {
            return composeDefaultResponseResult(StatusCodeUtil.NOT_FOUND);
        }

        const entityUpdateInfo: ConverterUpdateInfo<UserEntity> = UserConverter.convertUpsertRequestToEntityUpdate(
            request,
            existingUser
        );

        if (!entityUpdateInfo.hasDiff) {
            return composeDefaultResponseResult(StatusCodeUtil.OK);
        }

        const updateSuccess: boolean = await this.userRepository.updateUserById(userId, entityUpdateInfo.data);

        if (!updateSuccess) {
            return composeDefaultResponseResult(StatusCodeUtil.INTERNAL_SERVER_ERROR);
        }

        return composeDefaultResponseResult(StatusCodeUtil.OK);
    }

    async deleteUserById(userId: string): Promise<DefaultResult> {
        const UserEntity: UserEntity | null = await this.userRepository.getUserById(userId);

        if (!UserEntity) {
            return composeDefaultResponseResult(StatusCodeUtil.NOT_FOUND);
        }

        const deleteSuccess: boolean = await this.userRepository.deleteUserById(userId);

        if (!deleteSuccess) {
            return composeDefaultResponseResult(StatusCodeUtil.INTERNAL_SERVER_ERROR);
        }

        return composeDefaultResponseResult(StatusCodeUtil.OK);
    }

    async loginUser(data: UserLoginRequest): Promise<LoginResult> {
        const userEntity: UserEntity | null = await this.userRepository.getUserByEmail(data.email);

        if (userEntity === null) {
            return composeDefaultResponseResult(StatusCodeUtil.NOT_FOUND);
        }

        if (!checkStringIsAvailable(userEntity.password)) {
            return composeDefaultResponseResult(StatusCodeUtil.BAD_REQUEST);
        }

        const passwordCorrect: boolean = await compare(data.password, userEntity.password!);
        if (!passwordCorrect) {
            return composeDefaultResponseResult(StatusCodeUtil.UNAUTHORIZED);
        }

        const credential: Credential | null = await this.createCredentialAccess(
            userEntity
        );

        if (credential === null) {
            return composeDefaultResponseResult(StatusCodeUtil.INTERNAL_SERVER_ERROR);
        }

        return composeDefaultResponseResult(StatusCodeUtil.OK, credential);
    }

    async getUserTasks(userId: string): Promise<GetMyTasksResult> {
        const tasks: TaskEntity[] = await this.taskRepository.getTasksByUserId(userId);

        const task = TaskConverter.convertTaskEntitiesToModels(tasks);

        return composeDefaultResponseResult(StatusCodeUtil.OK, task);
    }

    private async createCredentialAccess(
        userEntity: UserEntity,
    ): Promise<Credential | null> {

        const tokenPayload: TokenPayload = new TokenPayload();
        tokenPayload.userId = userEntity.id;
        tokenPayload.email = userEntity.email;

        const accessToken: string | null = await this.tokenRepository.createAccessToken(tokenPayload);

        if (!checkStringIsAvailable(accessToken)) {
            return null;
        }

        return new Credential(accessToken!);
    }
}
