import { PageInfo } from "../model/page.info.model";

export function buildPageInfo({
    requestPage,
    requestLimit,
    totalCount
}: {
    requestPage: number;
    requestLimit: number;
    totalCount: number;
}): PageInfo {
    return new PageInfo({
        page: requestPage,
        perPage: requestLimit,
        pageCount: Math.ceil(totalCount / requestLimit),
        totalCount: totalCount
    });
}
