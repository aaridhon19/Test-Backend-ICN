import { UserEntity } from "src/core/entity/user.entity";
import { ConverterUpdateInfo } from "src/core/model/internal/converter.update.info.model";
import { UserCreateRequest } from "src/core/model/request/user.create.request.model";
import { User } from "src/core/model/user.model";
import { compareStringIsDiff } from "src/core/util/helper.util";

export class UserConverter {
    static convertUpsertRequestToEntity(request: UserCreateRequest): UserEntity {
        return new UserEntity({
            id: "",
            name: request.name,
            email: request.email,
            password: request.password,
            createdAt: BigInt(Date.now())
        });
    }

    static convertUpsertRequestToEntityUpdate(
        request: UserCreateRequest,
        currentEntity: UserEntity
    ): ConverterUpdateInfo<UserEntity> {
        let hasDiff: boolean = false;

        if (compareStringIsDiff(currentEntity.name, request.name)) {
            currentEntity.name = request.name;
            hasDiff = true;
        }

        if(compareStringIsDiff(currentEntity.email, request.email)) {
            currentEntity.email = request.email;
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

    static convertUserEntitiesToModels(entities: UserEntity[]): User[] {
        return entities.map(
            (entity: UserEntity): User => this.convertUserEntityToModel(entity)
        );
    }

    static convertUserEntityToModel(entity: UserEntity): User {
        return new User({
            id: entity.id,
            name: entity.name,
            email: entity.email,
            createdAt: entity.createdAt
        });
    }
}
