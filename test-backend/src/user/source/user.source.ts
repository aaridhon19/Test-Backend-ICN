import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/service/prisma.service";
import { UserRepository } from "../repository/user.repository";
import { UserEntity } from "src/core/entity/user.entity";
import { UserInternalEntity } from "src/core/entity/user.internal.entity";

@Injectable()
export class UserSource extends UserRepository {
    private logger = new Logger(UserSource.name);
    constructor(private readonly prismaService: PrismaService) {
        super();
    }

    async createUser(entity: UserEntity): Promise<UserEntity> {
        try {
            const createUserResult: UserInternalEntity = await this.prismaService.user.create({
                data: {
                    name: entity.name,
                    email: entity.email,
                    password: entity.password,
                    created_at: entity.createdAt
                }
            });

            return new UserEntity().fromUserInternalEntity(createUserResult);
        } catch (error) {
            this.logger.error("createUser: Error", error);
            return new UserEntity();
        }
    }

    async getAllUsers(): Promise<UserEntity[]> {
        try {
            const userInternalEntities: UserInternalEntity[] =
                await this.prismaService.user.findMany();

            return userInternalEntities.map((entity: UserInternalEntity) =>
                new UserEntity().fromUserInternalEntity(entity)
            );
        } catch (error) {
            this.logger.error("Get all users failed", error);
            return [];
        }
    }

    async getUserById(id: string): Promise<UserEntity | null> {
        try {
            const userInternalEntity: UserInternalEntity | null =
                await this.prismaService.user.findUnique({
                    where: { id: id }
                });

            if (userInternalEntity === null) {
                return null;
            }

            return new UserEntity().fromUserInternalEntity(userInternalEntity);
        } catch (error) {
            this.logger.error("getUserById: error", error);
            return null;
        }
    }

    async getUserByEmail(email: string): Promise<UserEntity | null> {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { email }
            });

            if (!user) {
                return null;
            }

            return new UserEntity().fromUserInternalEntity(user);
        } catch (error) {
            this.logger.error("Get user by email failed", error);
            return null;
        }
    }

    async updateUserById(id: string, entity: UserEntity): Promise<boolean> {
        try {
            const updateResult = await this.prismaService.user.update({
                where: { id : id },
                data: {
                    name: entity.name,
                    email: entity.email,
                    password: entity.password,
                    updated_at: entity.updatedAt
                }
            });

            return updateResult !== null
        } catch (error) {
            this.logger.error("Update user failed", error);
            return false;
        }
    }

    async deleteUserById(id: string): Promise<boolean> {
        try {
            const deleteResult = await this.prismaService.user.delete({
                where: { id : id }
            });

            return deleteResult !== null;
        } catch (error) {
            this.logger.error("Delete user failed", error);
            return false;
        }
    }
}
