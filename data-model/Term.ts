import { isString, isRecord } from '../util/types'

/** @see https://rdf.js.org/data-model-spec/#term-interface */
export interface TermSpec {
    termType: string
    value: string
    equals(other?: Term): boolean
}

export type TermData = {
    termType: string
    value: string
}

export default abstract class Term implements TermSpec {

    readonly termType: string
    readonly value: string

    constructor({ termType = new.target.name, value = '' }: Partial<TermData>) {
        if (!isString(termType)) throw new Error(`termType must be a string`)
        if (termType !== new.target.name) throw new Error(`termType must be "${new.target.name}"`)
        if (!isString(value)) throw new Error(`value must be a string`)

        this.termType = termType
        this.value = value

        Object.defineProperties(this, {
            termType: { writable: false, configurable: false },
            value: { writable: false, configurable: false }
        })
    }

    equals(other?: unknown): other is Term | TermSpec {
        return this === other || (
            other instanceof Term
                ? this.termType === other.termType && this.value === other.value
                : isRecord(other) && this.termType === other.termType && this.value === other.value
        )
    }

    toJSON(): TermData {
        return {
            termType: this.termType,
            value: this.value
        }
    }

}