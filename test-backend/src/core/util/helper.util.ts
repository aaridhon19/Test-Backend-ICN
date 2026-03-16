export function checkStringIsAvailable(value: string | null | undefined): boolean {
    return value !== undefined && value !== null && value.length > 0;
}

export function checkNumberIsAvailable(value: number | null | undefined): boolean {
    return value !== undefined && value !== null;
}

export function checkBigIntIsAvailable(value: bigint | null | undefined): boolean {
    return value !== undefined && value !== null;
}

export function checkBooleanIsAvailable(value: boolean | null | undefined): boolean {
    return value !== undefined && value !== null;
}

export function compareStringIsDiff(current: string | null | undefined, latest: string | null | undefined): boolean {
    if (checkStringIsAvailable(latest)) {
        return current !== latest;
    }

    return false;
}

export function compareNumberIsDiff(current: number | null | undefined, latest: number | null | undefined): boolean {
    if (checkNumberIsAvailable(latest)) {
        return current !== latest;
    }

    return false;
}

export function compareBigIntIsDiff(current: bigint | null | undefined, latest: bigint | null | undefined): boolean {
    if (checkBigIntIsAvailable(latest)) {
        return current !== latest;
    }
    return false;
}

export function compareBooleanIsDiff(current: boolean | null | undefined, latest: boolean | null | undefined): boolean {
    if (checkBooleanIsAvailable(latest)) {
        return current !== latest;
    }

    return false;
}

export function compareDateIsDiff(current: Date | null | undefined, latest: Date | null | undefined): boolean {
    if (checkNumberIsAvailable(latest?.getTime())) {
        return current?.getTime() !== latest?.getTime();
    }
    
    return false;
}
