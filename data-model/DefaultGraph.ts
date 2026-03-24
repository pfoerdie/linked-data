import Term, { TermSpec, TermData } from './Term'
import { isRecord } from '../util/types'

/** @see https://rdf.js.org/data-model-spec/#defaultgraph-interface */
export interface DefaultGraphSpec extends TermSpec {
    termType: string
    value: string
    equals(other?: Term): boolean
}

export type DefaultGraphData = TermData & {
    termType: 'DefaultGraph'
}

export default class DefaultGraph extends Term implements DefaultGraphSpec {

    /**
     * contains the constant "DefaultGraph".
     */
    readonly termType = 'DefaultGraph' as const

    /**
     * contains an empty string as constant value.
     */
    readonly value = '' as const

    constructor() {
        super()
        Object.freeze(this)
    }

    /**
     * returns true if all general Term.equals conditions hold; otherwise, it returns false.
     */
    equals(other?: unknown): boolean {
        if (this === other) return true
        if (other instanceof Term) return other instanceof DefaultGraph
        return isRecord(other) && this.termType === other.termType
    }

    toString(): string {
        return ''
    }

    toJSON(): DefaultGraphData {
        return {
            termType: this.termType
        }
    }

}

export const defaultGraph = new DefaultGraph()