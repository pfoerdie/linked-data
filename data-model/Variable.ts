import Term, { TermSpec, TermData } from './Term'
import { isRecord, Name, isName } from '../util/types'

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
    readonly value: Name

    constructor(value: string) {
        if (!isName(value)) throw new Error(`value must be a name string`)
        // TODO: validate that value is a name

        super()
        this.value = value
        Object.freeze(this)
    }

    /**
     * equals() returns true if all general Term.equals conditions hold and term.value is the same string as other.value; otherwise, it returns false.
     */
    equals(other?: unknown): boolean {
        if (this === other) return true
        if (other instanceof Term) return other instanceof Variable && this.value === other.value
        return isRecord(other) && this.termType === other.termType && this.value === other.value
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