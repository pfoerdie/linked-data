import Term, { TermSpec, TermData } from './Term'
import { randomUUID } from 'node:crypto'
import { isRecord, Nmtoken, isNmtoken } from '../util/types'

/** @see https://rdf.js.org/data-model-spec/#blanknode-interface */
export interface BlankNodeSpec extends TermSpec {
    termType: string
    value: string
    equals(other?: Term): boolean
}

export type BlankNodeData = TermData & {
    termType: 'BlankNode'
    value: string
}

export default class BlankNode extends Term implements BlankNodeSpec {

    /**
     * contains the constant "BlankNode".
     */
    readonly termType = 'BlankNode' as const

    /**
     * blank node name as a string, without any serialization specific prefixes,
     * e.g. when parsing, if the data was sourced from Turtle,remove "_:",
     * if it was sourced from RDF/XML, do not change the blank node name (example: "blank3")
     */
    readonly value: Nmtoken

    constructor(value: string = randomUUID()) {
        if (!isNmtoken(value)) throw new Error(`value must be a nmtoken string`)

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
        if (other instanceof Term) return other instanceof BlankNode && this.value === other.value
        return isRecord(other) && this.termType === other.termType && this.value === other.value
    }

    /** @see https://www.w3.org/TR/rdf12-n-quads/#grammar-production-BLANK_NODE_LABEL */
    toString(): string {
        return '_:' + this.value
    }

    toJSON(): BlankNodeData {
        return {
            termType: this.termType,
            value: this.value
        }
    }

}