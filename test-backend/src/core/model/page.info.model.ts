import { Expose } from "class-transformer";

export class PageInfo {
    @Expose({ name: "page" })
    page: number = 0;

    @Expose({ name: "per_page" })
    perPage: number = 0;

    @Expose({ name: "page_count" })
    pageCount: number = 0;

    @Expose({ name: "total_count" })
    totalCount: number = 0;

    constructor({ page, perPage, pageCount, totalCount }: PageInfo) {
        this.page = page;
        this.perPage = perPage;
        this.pageCount = pageCount;
        this.totalCount = totalCount;
    }
}
