export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean'
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number'
}

export function isString(value: unknown): value is string {
    return typeof value === 'string'
}

export type TypedString<T extends string> = string & { readonly __type: T }
export type TypedPattern<T extends string> = RegExp & { test: (value: string) => value is TypedString<T> }

/** @see https://www.w3.org/TR/xml/#NT-Name */
export type Name = TypedString<'Name'>
export const reName = (/^[^\s0-9.-]\S*$/) as TypedPattern<'Name'>
export function isName(value: unknown): value is Name {
    return isString(value) && reName.test(value)
}

/** @see https://www.w3.org/TR/xml/#NT-Nmtoken */
export type Nmtoken = TypedString<'Nmtoken'>
export const reNmtoken = (/^\S+$/) as TypedPattern<'Nmtoken'>
export function isNmtoken(value: unknown): value is Nmtoken {
    return isString(value) && reNmtoken.test(value)
}

/** @see https://datatracker.ietf.org/doc/html/rfc3987 */
export type IRI = TypedString<'IRI'>
export const reIRI = (/^[a-z][a-z0-9+.-]*:[^\s"<>\\^`{|}]*$/i) as TypedPattern<'IRI'>
export function isIRI(value: unknown): value is IRI {
    return isString(value) && reIRI.test(value)
}

/** @see https://datatracker.ietf.org/doc/html/rfc5646 */
export type LanguageTag = TypedString<'LanguageTag'>
export const reLanguageTag = (/^[a-z]{1,3}(?:-[a-z0-9]{1,8})*$/i) as TypedPattern<'LanguageTag'>
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