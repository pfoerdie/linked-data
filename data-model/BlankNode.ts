import type { BlankNode as BlankNodeSpec } from '@rdfjs/types'
import Term, { isTerm } from './Term'

export { BlankNodeSpec }

export function isBlankNode(term: unknown): term is BlankNodeSpec {
    return isTerm(term) && term.termType === 'BlankNode'
}

export default abstract class BlankNode extends Term<'BlankNode'> implements BlankNodeSpec {

    get termType() {
        return 'BlankNode' as const
    }

    abstract get value(): string

    equals(other: unknown): boolean {
        switch (true) {
            case this === other:
                return true
            case other instanceof BlankNode:
                return this.value === other.value
            case other instanceof Term:
                return false
            default:
                return isBlankNode(other)
                    && this.value === other.value
        }
    }

    toString(): string {
        return '_:' + this.value
    }

    toJSON(): Pick<BlankNodeSpec, 'termType' | 'value'> {
        return {
            termType: 'BlankNode' as const,
            value: this.value
        }
    }

}