import Term, { TermSpec, TermData } from './Term'

/** @see https://rdf.js.org/data-model-spec/#variable-interface */
export interface VariableSpec extends TermSpec {
    termType: string
    value: string
    equals(other?: Term): boolean
}

export type VariableData = TermData & {
    termType: 'Variable'
    value: string
}

export default class Variable extends Term implements VariableSpec {

    /**
     * termType contains the constant "Variable".
     */
    readonly termType = 'Variable' as const

    /**
     * value the name of the variable without leading "?" (example: "a").
     */
    readonly value: string

    constructor(value: string) {
        if (typeof value === 'string') throw new Error(`value must be a string`)
        // TODO: validate that value is a name
        super()
        this.value = value
        Object.freeze(this)
    }

    toString(): string {
        return '?' + this.value
    }

    toJSON(): VariableData {
        return {
            termType: this.termType,
            value: this.value
        }
    }

}