import Term, { TermSpec, TermData } from './Term'
import { isIRI, isRecord } from '../util/types'

/** @see https://rdf.js.org/data-model-spec/#namednode-interface */
export interface NamedNodeSpec extends TermSpec {
    termType: string
    value: string
    equals(other?: Term): boolean
}

export type NamedNodeData = TermData & {
    termType: 'NamedNode'
    value: string
}

export default class NamedNode extends Term implements NamedNodeSpec {

    /**
     * contains the constant "NamedNode".
     */
    readonly termType = 'NamedNode' as const

    /**
     * the IRI of the named node (example: "http://example.org/resource").
     */
    readonly value: string

    constructor(value: string) {
        if (!isIRI(value)) throw new Error(`value must be an IRI string`)

        super()
        this.value = value
        Object.freeze(this)
    }

    /**
     * returns true if all general Term.equals conditions hold and term.value
     * is the same string as other.value; otherwise, it returns false.
     */
    equals(other?: unknown): boolean {
        if (this === other) return true
        if (other instanceof Term) return other instanceof NamedNode && this.value === other.value
        return isRecord(other) && this.termType === other.termType && this.value === other.value
    }

    /** @see https://www.w3.org/TR/rdf12-n-quads/#grammar-production-IRIREF */
    toString(): string {
        return '<' + this.value + '>'
    }

    toJSON(): NamedNodeData {
        return {
            termType: this.termType,
            value: this.value
        }
    }

}