import Term, { TermSpec, TermData } from './Term'
import NamedNode, { NamedNodeSpec, NamedNodeData } from './NamedNode'
import { isRecord, isString, LanguageTag, isLanguageTag } from '../util/types'

/** @see https://rdf.js.org/data-model-spec/#literal-interface */
export interface LiteralSpec extends TermSpec {
    termType: string
    value: string
    language: string
    direction?: string
    datatype: NamedNodeSpec
    equals(other?: Term): boolean
}

export interface DirectionalLanguage {
    language: string
    direction?: string
}

export type LiteralData = TermData & {
    termType: 'Literal'
    value: string
    language?: string
    direction?: 'ltr' | 'rtl'
    datatype?: NamedNodeData
}

export const xsd_string = new NamedNode('http://www.w3.org/2001/XMLSchema#string')
export const rdf_langString = new NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
export const rdf_dirLangString = new NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#dirLangString')

export default class Literal extends Term implements LiteralSpec {

    /**
     * contains the constant "Literal".
     */
    readonly termType = 'Literal' as const

    /**
     * the text value, unescaped, without language or type (example: "Brad Pitt")
     */
    readonly value: string

    /**
     * the language as lowercase [BCP47] string (examples: "en", "en-gb") or an empty string if the literal has no language.
     */
    readonly language: LanguageTag

    /**
     * is not falsy if the string is a directional language-tagged string. In this case, the direction MUST be either be "ltr" or "rtl".
     * Implementations supporting this feature should use an empty string when no direction is given.
     * null or undefined values are allowed to maintain compatibility with legacy implementations.
     */
    readonly direction: 'ltr' | 'rtl' | ''

    /**
     * a NamedNode whose IRI represents the datatype of the literal.
     * If the literal has a language and a direction, its datatype has the IRI "http://www.w3.org/1999/02/22-rdf-syntax-ns#dirLangString".
     * If the literal has a language without direction, its datatype has the IRI "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString".
     * Otherwise, if no datatype is explicitly specified, the datatype has the IRI "http://www.w3.org/2001/XMLSchema#string".
     */
    readonly datatype: NamedNode

    constructor(value: string, languageOrDatatype: string | NamedNode | DirectionalLanguage) {
        if (!isString(value)) throw new Error(`value must be a string`)

        const language = isString(languageOrDatatype) ? languageOrDatatype
            : languageOrDatatype instanceof NamedNode ? ''
                : isRecord(languageOrDatatype) ? languageOrDatatype.language : ''
        if (!isLanguageTag(language)) throw new Error(`language must be a string`)

        const direction = languageOrDatatype instanceof NamedNode ? ''
            : isRecord(languageOrDatatype) ? languageOrDatatype.direction ?? '' : ''
        if (!isString(direction)) throw new Error(`direction must be a string`)
        if (direction !== '' && direction !== 'ltr' && direction !== 'rtl') throw new Error(`direction can only be "ltr" or "rtl"`)
        if (direction && !language) throw new Error('language must not be empty if direction is defined')

        const datatype = languageOrDatatype instanceof NamedNode ? languageOrDatatype
            : language ? direction ? rdf_langString : rdf_dirLangString : xsd_string
        if (!(datatype instanceof NamedNode)) throw new Error(`datatype must be a NamedNode`)

        super()
        this.value = value
        this.language = language
        this.direction = direction
        this.datatype = datatype
        Object.freeze(this)
    }

    /**
     * returns true if all general Term.equals conditions hold, term.value is the same string as other.value,
     * term.language is the same string as other.language, term.direction is the same string as other.direction or are both falsy,
     * and term.datatype.equals(other.datatype) evaluates to true; otherwise, it returns false.
     */
    equals(other?: unknown): boolean {
        if (this === other) return true
        if (other instanceof Term) return other instanceof Literal && this.value === other.value
            && this.language === other.language && this.direction === other.direction && this.datatype.equals(other.datatype)
        return isRecord(other) && this.termType === other.termType && this.value === other.value
            && this.language === other.language && this.direction === other.direction && this.datatype.equals(other.datatype)
    }

    /** @see https://www.w3.org/TR/rdf12-n-quads/#grammar-production-literal */
    toString(): string {
        // TODO: correctly encode value
        const encoded = encodeURIComponent(this.value)
        const suffix = this.language ? this.direction
            ? `@${this.language}--${this.direction}`
            : `@${this.language}` : this.datatype.equals(xsd_string)
            ? '' : `^^${this.datatype}`
        return `"${encoded}"${suffix}`
    }

    toJSON(): LiteralData {
        return this.language ? this.direction ? {
            termType: this.termType,
            value: this.value,
            language: this.language,
            direction: this.direction
        } : {
            termType: this.termType,
            value: this.value,
            language: this.language
        } : this.datatype.equals(xsd_string) ? {
            termType: this.termType,
            value: this.value
        } : {
            termType: this.termType,
            value: this.value,
            datatype: this.datatype.toJSON()
        }
    }

}