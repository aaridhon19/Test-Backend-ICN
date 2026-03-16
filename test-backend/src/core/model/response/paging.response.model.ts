import { Expose } from "class-transformer";
import { PageInfo } from "src/core/model/page.info.model";

export class PagingResponse<T> {
    @Expose({ name: "code" }) code: number;
    @Expose({ name: "message" }) message: string;
    @Expose({ name: "payload" }) payload: T[] | undefined;
    @Expose({ name: "page_info" }) pageInfo: PageInfo | undefined;
}
