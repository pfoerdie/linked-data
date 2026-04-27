import { DefaultGraph as DefaultGraphSpec, isDefaultGraph } from '../util/types'

/** @see https://rdf.js.org/data-model-spec/#defaultgraph-interface */
export default class DefaultGraph implements DefaultGraphSpec {

    /** contains the constant "DefaultGraph". */
    readonly termType = 'DefaultGraph' as const

    /** contains an empty string as constant value. */
    readonly value = '' as const

    constructor() {
        Object.defineProperty(this, 'value', { enumerable: false })
        Object.freeze(this)
    }

    /**
     * returns true if all general Term.equals conditions hold;
     * otherwise, it returns false.
     */
    equals(other?: unknown): boolean {
        if (this === other) return true
        if (other instanceof DefaultGraph) return true
        return isDefaultGraph(other)
    }

    toString(): string {
        return ''
    }

    toJSON(): Pick<DefaultGraphSpec, 'termType'> {
        return {
            termType: this.termType
        }
    }

}