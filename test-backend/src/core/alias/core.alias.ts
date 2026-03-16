import { AppResponse } from "../model/response/app.response.model";
import { DefaultResponse } from "../model/response/default.response.model";

export type DefaultResult = AppResponse<DefaultResponse<undefined>>;
