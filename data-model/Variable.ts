import { type VariableSpec, isVariable } from './types'
import { type Name, isName } from './types'

export default class Variable implements VariableSpec {

    get termType(): 'Variable' {
        return 'Variable'
    }

    #value: Name

    get value(): Name {
        return this.#value
    }

    constructor(value: string) {
        if (!isName(value)) throw new Error('value must be a Name string')
        this.#value = value
    }

    equals(other: unknown): boolean {
        switch (true) {
            case this === other:
                return true
            case other instanceof Variable:
            case isVariable(other):
                return this.value === other.value
            default:
                return false
        }
    }

}