import type { Variable as VariableSpec } from '@rdfjs/types'
import Term, { isTerm } from './Term'

export { VariableSpec }

export function isVariable(term: unknown): term is VariableSpec {
    return isTerm(term) && term.termType === 'Variable'
}

export default abstract class Variable extends Term<'Variable'> implements VariableSpec {

    get termType() {
        return 'Variable' as const
    }

    abstract get value(): string

    equals(other: unknown): boolean {
        switch (true) {
            case this === other:
                return true
            case other instanceof Variable:
                return this.value === other.value
            case other instanceof Term:
                return false
            default:
                return isVariable(other)
                    && this.value === other.value
        }
    }

    toString(): string {
        return '?' + this.value
    }

    toJSON(): Pick<VariableSpec, 'termType' | 'value'> {
        return {
            termType: 'Variable' as const,
            value: this.value
        }
    }

}