import { AppResponse } from "src/core/model/response/app.response.model";
import { DefaultResponse } from "src/core/model/response/default.response.model";
import { PagingResponse } from "src/core/model/response/paging.response.model";
import { Task } from "src/core/model/task.model";

export type GetTaskResult = AppResponse<DefaultResponse<Task>>;
export type GetTaskResults = AppResponse<PagingResponse<Task>>;
export type GetMyTasksResult = AppResponse<DefaultResponse<Task[]>>;