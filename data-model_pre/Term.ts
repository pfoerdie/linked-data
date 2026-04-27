import { isString, isRecord } from '../util/types'

/** @see https://rdf.js.org/data-model-spec/#term-interface */
export interface TermSpec {
    termType: string
    value: string
    equals(other?: Term): boolean
}

export type TermData = {
    termType: string
}

export default abstract class Term implements TermSpec {

    /**
     * contains a value that identifies the concrete interface of the term, since Term itself is not directly instantiated.
     * Possible values include "NamedNode", "BlankNode", "Literal", "Variable", "DefaultGraph" and "Quad".
     */
    abstract readonly termType: string

    /**
     * is refined by each interface which extends Term.
     */
    abstract readonly value: string

    /**
     * returns true when called with parameter other on an object term if all of the conditions below hold:
     * - other is neither null nor undefined;
     * - term.termType is the same string as other.termType;
     * - other follows the additional constraints of the specific Term interface implemented by term (e.g., NamedNode, Literal, …);
     * otherwise, it returns false.
     */
    abstract equals(other?: unknown): boolean

    abstract toString(): string
    abstract toJSON(): TermData

}