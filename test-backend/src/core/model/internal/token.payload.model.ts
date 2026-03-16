import { Expose } from "class-transformer";

export class TokenPayload {
    @Expose({ name: "user_id" }) userId: string;
    @Expose({ name: "email" }) email: string;
}
