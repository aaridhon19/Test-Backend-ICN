import { Expose } from "class-transformer";

export class UserCreateRequest {
    @Expose({ name: "name" })
    name: string;

    @Expose({ name: "email" })
    email: string;

    @Expose({ name: "password" })
    password: string;
}
