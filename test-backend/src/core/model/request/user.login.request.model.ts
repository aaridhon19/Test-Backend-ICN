import { Expose } from "class-transformer";

export class UserLoginRequest {
    @Expose({ name: "email" })
    email: string;

    @Expose({ name: "password" })
    password: string;
}
