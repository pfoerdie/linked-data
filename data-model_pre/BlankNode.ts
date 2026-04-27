import { randomUUID } from 'node:crypto'
import { Nmtoken, isNmtoken, BlankNode as BlankNodeSpec, isBlankNode } from '../util/types'


/** @see https://rdf.js.org/data-model-spec/#blanknode-interface */
export default class BlankNode implements BlankNodeSpec {

    /** contains the constant "BlankNode". */
    readonly termType = 'BlankNode' as const

    /**
     * blank node name as a string, without any serialization specific prefixes,
     * e.g. when parsing, if the data was sourced from Turtle,remove "_:",
     * if it was sourced from RDF/XML, do not change the blank node name (example: "blank3")
     */
    readonly value: Nmtoken

    constructor(value: string = randomUUID()) {
        if (!isNmtoken(value)) throw new Error(`value must be a nmtoken string`)

        this.value = value
        Object.freeze(this)
    }

    /**
     * returns true if all general Term.equals conditions hold and term.value
     * is the same string as other.value; otherwise, it returns false.
     */
    equals(other?: unknown): boolean {
        if (this === other) return true
        if (other instanceof BlankNode) return this.value === other.value
        return isBlankNode(other) && this.value === other.value
    }

    /** @see https://www.w3.org/TR/rdf12-n-quads/#grammar-production-BLANK_NODE_LABEL */
    toString(): string {
        return '_:' + this.value
    }

    toJSON(): Pick<BlankNodeSpec, 'termType' | 'value'> {
        return {
            termType: this.termType,
            value: this.value
        }
    }

}