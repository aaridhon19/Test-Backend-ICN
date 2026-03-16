import { Expose } from "class-transformer";

export class DefaultQueryParamRequest {
    @Expose({ name: "page" }) page: number = 1;
    @Expose({ name: "limit" }) limit: number = 20;
}
