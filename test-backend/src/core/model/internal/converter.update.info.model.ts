export class ConverterUpdateInfo<T> {
    hasDiff: boolean;
    data: T;

    constructor({ hasDiff, data }: ConverterUpdateInfo<T>) {
        this.hasDiff = hasDiff;
        this.data = data;
    }
}
