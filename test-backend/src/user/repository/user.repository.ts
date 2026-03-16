import { UserEntity } from "src/core/entity/user.entity";

export abstract class UserRepository {
    abstract createUser(entity: UserEntity): Promise<UserEntity>;
    abstract getAllUsers(): Promise<UserEntity[]>;
    abstract getUserById(id: string): Promise<UserEntity | null>;
    abstract getUserByEmail(email: string): Promise<UserEntity | null>;
    abstract updateUserById(id: string, entity: UserEntity): Promise<boolean>;
    abstract deleteUserById(id: string): Promise<boolean>;
}
