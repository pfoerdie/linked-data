import { type IRI, isIRI, isString, NamedNode as NamedNodeSpec, isNamedNode } from '../util/types'
import NamedNode from './NamedNode'

/** @see https://rdf.js.org/data-model-spec/#namednode-interface */
export default class Namespace implements NamedNodeSpec<IRI> {

    /** contains the constant "NamedNode". */
    readonly termType = 'NamedNode' as const

    /** the IRI of the named node (example: "http://example.org/resource"). */
    readonly value: IRI

    constructor(value: string) {
        if (!isIRI(value)) throw new Error(`value must be an IRI string`)
        if (!value.endsWith('/') && !value.endsWith('#')) throw new Error(`value must end with / or #`)

        this.value = value
        Object.freeze(this)
    }

    /**
     * returns true if all general Term.equals conditions hold and term.value
     * is the same string as other.value; otherwise, it returns false.
     */
    equals(other?: unknown): boolean {
        if (this === other) return true
        if (other instanceof Namespace) return this.value === other.value
        if (other instanceof NamedNode) return this.value === other.value
        return isNamedNode(other) && this.value === other.value
    }

    /** @see https://www.w3.org/TR/rdf12-n-quads/#grammar-production-IRIREF */
    toString(): string {
        return '<' + this.value + '>'
    }

    toJSON(): Pick<NamedNodeSpec, 'termType' | 'value'> {
        return {
            termType: this.termType,
            value: this.value
        }
    }

    namedNode(value: string): NamedNode {
        if (!isString(value)) throw new Error(`value must be a string`)
        return new NamedNode(this.value + value)
    }

}