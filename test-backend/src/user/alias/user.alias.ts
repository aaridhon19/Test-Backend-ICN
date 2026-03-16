import { Credential } from "src/core/model/credential.model";
import { AppResponse } from "src/core/model/response/app.response.model";
import { DefaultResponse } from "src/core/model/response/default.response.model";
import { User } from "src/core/model/user.model";

export type GetUserResult = AppResponse<DefaultResponse<User>>;
export type GetUserResults = AppResponse<DefaultResponse<User[]>>;
export type LoginResult = AppResponse<DefaultResponse<Credential>>;