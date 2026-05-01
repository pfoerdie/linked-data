import { type LiteralSpec, isLiteral } from './types'
import { type NamedNodeSpec, isNamedNode } from './types'
import { type LanguageTag, isLanguageTag } from './types'
import { isNull, isString } from './types'

export default class Literal implements LiteralSpec {

    get termType(): 'Literal' {
        return 'Literal'
    }

    #value: string

    get value(): string {
        return this.#value
    }

    #language: LanguageTag | null

    get language(): LanguageTag | '' {
        return this.#language ?? ''
    }

    #datatype: NamedNodeSpec

    get datatype(): NamedNodeSpec {
        return this.#datatype
    }

    constructor(value: string, datatype: NamedNodeSpec, language?: string) {
        if (!isString(value)) throw new Error('value must be a string')
        if (!isNamedNode(datatype)) throw new Error('datatype must be a NamedNode')
        if (!isNull(language) && !isLanguageTag(language)) throw new Error('language must be a LanguageTag string')
        this.#value = value
        this.#datatype = datatype
        this.#language = language ?? null
    }

    equals(other: unknown): boolean {
        switch (true) {
            case this === other:
                return true
            case other instanceof Literal:
            case isLiteral(other):
                return this.datatype.equals(other.datatype)
                    && this.language === other.language
                    && this.value === other.value
            default:
                return false
        }
    }

}