export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean'
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number'
}

export function isString(value: unknown): value is string {
    return typeof value === 'string'
}

export function isArray(value: unknown): value is Array<any> {
    return Array.isArray(value)
}

export function isRecord(value: unknown): value is Record<any, any> {
    return typeof value === 'object' && value !== null && !isArray(value)
}

export function isFunction(value: unknown): value is Function {
    return typeof value === 'function'
}