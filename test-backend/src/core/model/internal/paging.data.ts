export class PagingData<T> {
    total: number;
    data: T[];

    constructor({ total, data }: PagingData<T>) {
        this.total = total;
        this.data = data;
    }
}
