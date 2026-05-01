export function isNull(value: unknown): value is undefined | null {
    return value === undefined || value === null
}

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
export const NamePattern = (/^[^\s0-9.-]\S*$/) as TypedPattern<'Name'>
export function isName(value: unknown): value is Name {
    return isString(value) && NamePattern.test(value)
}

/** @see https://www.w3.org/TR/xml/#NT-Nmtoken */
export type Nmtoken = TypedString<'Nmtoken'>
export const NmtokenPattern = (/^\S+$/) as TypedPattern<'Nmtoken'>
export function isNmtoken(value: unknown): value is Nmtoken {
    return isString(value) && NmtokenPattern.test(value)
}

/** @see https://datatracker.ietf.org/doc/html/rfc3987 */
export type IRI = TypedString<'IRI'>
export const IRIPattern = (/^[a-z][a-z0-9+.-]*:[^\s"<>\\^`{|}]*$/i) as TypedPattern<'IRI'>
export function isIRI(value: unknown): value is IRI {
    return isString(value) && IRIPattern.test(value)
}

/** @see https://datatracker.ietf.org/doc/html/rfc5646 */
export type LanguageTag = TypedString<'LanguageTag'>
export const LanguageTagPattern = (/^[a-z]{1,3}(?:-[a-z0-9]{1,8})*$/i) as TypedPattern<'LanguageTag'>
export function isLanguageTag(value: unknown): value is LanguageTag {
    return isString(value) && LanguageTagPattern.test(value)
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

import type { Term as TermSpec } from '@rdfjs/types'
export type { TermSpec }
export const TermTypes = ['NamedNode', 'BlankNode', 'Variable', 'Literal', 'DefaultGraph', 'Quad'] as const
export function isTerm(value: unknown): value is TermSpec {
    return isRecord(value) && TermTypes.includes(value.termType)
}

import type { NamedNode as NamedNodeSpec } from '@rdfjs/types'
export type { NamedNodeSpec }
export function isNamedNode(value: unknown): value is NamedNodeSpec {
    return isRecord(value) && value.termType === 'NamedNode'
}

import type { BlankNode as BlankNodeSpec } from '@rdfjs/types'
export type { BlankNodeSpec }
export function isBlankNode(value: unknown): value is BlankNodeSpec {
    return isRecord(value) && value.termType === 'BlankNode'
}

import type { Literal as LiteralSpec } from '@rdfjs/types'
export type { LiteralSpec }
export function isLiteral(value: unknown): value is LiteralSpec {
    return isRecord(value) && value.termType === 'Literal'
}

import type { Variable as VariableSpec } from '@rdfjs/types'
export type { VariableSpec }
export function isVariable(value: unknown): value is VariableSpec {
    return isRecord(value) && value.termType === 'Variable'
}

import type { DefaultGraph as DefaultGraphSpec } from '@rdfjs/types'
export type { DefaultGraphSpec }
export function isDefaultGraph(value: unknown): value is DefaultGraphSpec {
    return isRecord(value) && value.termType === 'DefaultGraph'
}

import type { BaseQuad as BaseQuadSpec } from '@rdfjs/types'
export type { BaseQuadSpec }
export function isBaseQuad(value: unknown): value is BaseQuadSpec {
    return isRecord(value) && value.termType === 'Quad'
}

import type { Quad_Subject as SubjectSpec } from '@rdfjs/types'
export type { SubjectSpec }
export const SubjectTermTypes = ['NamedNode', 'BlankNode', 'Variable', 'Quad'] as const
export function isSubject(value: unknown): value is SubjectSpec {
    return isRecord(value) && SubjectTermTypes.includes(value.termType)
}

import type { Quad_Predicate as PredicateSpec } from '@rdfjs/types'
export type { PredicateSpec }
export const PredicateTermTypes = ['NamedNode', 'Variable'] as const
export function isPredicate(value: unknown): value is PredicateSpec {
    return isRecord(value) && PredicateTermTypes.includes(value.termType)
}

import type { Quad_Object as ObjectSpec } from '@rdfjs/types'
export type { ObjectSpec }
export const ObjectTermTypes = ['NamedNode', 'BlankNode', 'Variable', 'Literal', 'Quad'] as const
export function isObject(value: unknown): value is ObjectSpec {
    return isRecord(value) && ObjectTermTypes.includes(value.termType)
}

import type { Quad_Graph as GraphSpec } from '@rdfjs/types'
export type { GraphSpec }
export const GraphTermTypes = ['NamedNode', 'BlankNode', 'Variable', 'DefaultGraph'] as const
export function isGraph(value: unknown): value is GraphSpec {
    return isRecord(value) && GraphTermTypes.includes(value.termType)
}

import type { Quad as QuadSpec } from '@rdfjs/types'
export type { QuadSpec }
export function isQuad(value: unknown): value is QuadSpec {
    return isBaseQuad(value) && isSubject(value.subject) && isPredicate(value.predicate) && isObject(value.object) && isGraph(value.graph)
}

import type { DataFactory as DataFactorySpec } from '@rdfjs/types'
export type { DataFactorySpec }
export function isDataFactory(value: unknown): value is DataFactorySpec {
    return isRecord(value) && isFunction(value.fromTerm)
}