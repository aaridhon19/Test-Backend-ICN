import { HttpStatus } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { AppResponse } from "../model/response/app.response.model";
import { DefaultResponse } from "../model/response/default.response.model";
import { StatusCode } from "../model/status.code.model";
import { PagingResponse } from "../model/response/paging.response.model";
import { PageInfo } from "../model/page.info.model";
import { Response } from "express";

export function sendResponseByResult<T>(
    response: Response,
    result: AppResponse<T>,
    transformGroups: string[] | undefined = undefined
) {
    response.status(result.statusCode.code).json(
        instanceToPlain(result.responseBody, {
            exposeUnsetFields: false,
            groups: transformGroups
        })
    );
}

export function sendUnauthorizedResponse(response: Response) {
    response.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: "Unauthorized"
    });
}

export function sendInternalServerErrorResponse(response: Response) {
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error"
    });
}

export function composeDefaultResponseResult<T>(statusCode: StatusCode, payload?: T): AppResponse<DefaultResponse<T>> {
    const result: AppResponse<DefaultResponse<T>> = new AppResponse<DefaultResponse<T>>();
    result.statusCode = statusCode;

    const defaultResponse = new DefaultResponse<T>();
    defaultResponse.code = statusCode.code;
    defaultResponse.message = statusCode.message;
    defaultResponse.payload = payload;
    result.responseBody = defaultResponse;

    return result;
}

export function composePagingResponseResult<T>(
    statusCode: StatusCode,
    pageInfo: PageInfo | undefined = undefined,
    payload: T[] | undefined = undefined
): AppResponse<PagingResponse<T>> {
    const result: AppResponse<PagingResponse<T>> = new AppResponse<PagingResponse<T>>();
    result.statusCode = statusCode;

    const pagingResponse = new PagingResponse<T>();
    pagingResponse.code = statusCode.code;
    pagingResponse.message = statusCode.message;
    pagingResponse.payload = payload;
    pagingResponse.pageInfo = pageInfo;
    result.responseBody = pagingResponse;

    return result;
}
