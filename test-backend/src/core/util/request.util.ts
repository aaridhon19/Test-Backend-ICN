import { Request } from "express";
import { plainToInstance } from "class-transformer";
import { TokenPayload } from "../model/internal/token.payload.model";

export function parseUserInfo(request: Request): TokenPayload {
    return plainToInstance(TokenPayload, (request as any).user);
}
