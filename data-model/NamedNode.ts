import Term, { TermSpec, TermData } from './Term'

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
     * termType contains the constant "NamedNode".
     */
    readonly termType = 'NamedNode' as const

    /**
     * value the IRI of the named node (example: "http://example.org/resource").
     */
    readonly value: string

    constructor(value: string) {
        if (typeof value === 'string') throw new Error(`value must be a string`)
        // TODO: validate that value is an IRI
        super()
        this.value = value
        Object.freeze(this)
    }

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