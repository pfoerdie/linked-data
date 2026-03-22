import Term, { TermSpec, TermData } from './Term'
import NamedNode, { NamedNodeSpec, NamedNodeData } from './NamedNode'

/** @see https://rdf.js.org/data-model-spec/#literal-interface */
export interface LiteralSpec extends TermSpec {
    termType: string
    value: string
    language: string
    direction?: string
    datatype: NamedNodeSpec
    equals(other?: Term): boolean
}

export type LiteralData = TermData & {
    termType: 'Literal'
    value: string
    language?: string
    direction?: 'ltr' | 'rtl'
    datatype?: NamedNodeData
}

export default class Literal extends Term implements LiteralSpec {

    /**
     * termType contains the constant "Literal".
     */
    readonly termType = 'Literal' as const

    /**
     * value the text value, unescaped, without language or type (example: "Brad Pitt")
     */
    readonly value: string

    /**
     * language the language as lowercase [BCP47] string (examples: "en", "en-gb") or an empty string if the literal has no language.
     */
    readonly language: string

    /**
     * direction is not falsy if the string is a directional language-tagged string. In this case, the direction MUST be either be "ltr" or "rtl".
     * Implementations supporting this feature should use an empty string when no direction is given.
     * null or undefined values are allowed to maintain compatibility with legacy implementations.
     */
    readonly direction: 'ltr' | 'rtl' | ''

    /**
     * datatype a NamedNode whose IRI represents the datatype of the literal.
     * If the literal has a language and a direction, its datatype has the IRI "http://www.w3.org/1999/02/22-rdf-syntax-ns#dirLangString".
     * If the literal has a language without direction, its datatype has the IRI "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString".
     * Otherwise, if no datatype is explicitly specified, the datatype has the IRI "http://www.w3.org/2001/XMLSchema#string".
     */
    readonly datatype: NamedNode

}