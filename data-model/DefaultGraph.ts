import Term, { TermSpec, TermData } from './Term'

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
     * termType contains the constant "DefaultGraph".
     */
    readonly termType = 'DefaultGraph' as const

    /**
     * value contains an empty string as constant value.
     */
    readonly value = '' as const

    constructor() {
        super()
        Object.freeze(this)
    }

}