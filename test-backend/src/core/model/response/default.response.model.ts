import { Expose } from "class-transformer";

export class DefaultResponse<T> {
    @Expose({ name: "code" }) code: number;
    @Expose({ name: "message" }) message: string;
    @Expose({ name: "payload" }) payload?: T;
}
