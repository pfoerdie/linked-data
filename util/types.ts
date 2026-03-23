export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean'
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number'
}

export function isString(value: unknown): value is string {
    return typeof value === 'string'
}

/** @see https://www.w3.org/TR/xml/#NT-Name */
export type Name = string & { readonly __brand: 'Name' }
export const reName = /^[^\s0-9.-]\S*$/
export function isName(value: unknown): value is Name {
    return isString(value) && reName.test(value)
}

/** @see https://datatracker.ietf.org/doc/html/rfc3987 */
export type IRI = string & { readonly __brand: 'IRI' }
export const reIRI = /^[a-z][a-z0-9+.-]*:[^\s"<>\\^`{|}]*$/i
export function isIRI(value: unknown): value is IRI {
    return isString(value) && reIRI.test(value)
}

/** @see https://datatracker.ietf.org/doc/html/rfc5646 */
export type LanguageTag = string & { readonly __brand: 'LanguageTag' }
export const reLanguageTag = /^[a-z]{1,3}(?:-[a-z0-9]{1,8})*$/i
export function isLanguageTag(value: unknown): value is LanguageTag {
    return isString(value) && reLanguageTag.test(value)
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