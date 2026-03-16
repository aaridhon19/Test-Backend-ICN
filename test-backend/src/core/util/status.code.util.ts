import { StatusCode } from "../model/status.code.model";

export class StatusCodeUtil {
    /**
     * 200 Family
     */
    static OK: StatusCode = new StatusCode(200, "OK");
    static CREATED: StatusCode = new StatusCode(201, "Created");

    /**
     * 300 Family
     */
    static FOUND: StatusCode = new StatusCode(302, "Found");

    /**
     * 400 Family
     */
    static BAD_REQUEST: StatusCode = new StatusCode(400, "Bad Request");
    static UNAUTHORIZED: StatusCode = new StatusCode(401, "Unauthorized");
    static FORBIDDEN: StatusCode = new StatusCode(403, "Forbidden");
    static NOT_FOUND: StatusCode = new StatusCode(404, "Not Found");
    static NOT_ACCEPTABLE: StatusCode = new StatusCode(406, "Not Acceptable");
    static CONFLICT: StatusCode = new StatusCode(409, "Conflict");

    /**
     * 500 Family
     */
    static INTERNAL_SERVER_ERROR: StatusCode = new StatusCode(500, "Internal Server Error");
}
