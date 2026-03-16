import { StatusCode } from "../status.code.model";

export class AppResponse<T> {
    statusCode: StatusCode;
    responseBody: T;
}
