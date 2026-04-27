import type { NamedNode as NamedNodeSpec } from '@rdfjs/types'
import Term, { isTerm } from './Term'

export { NamedNodeSpec }

export function isNamedNode(term: unknown): term is NamedNodeSpec {
    return isTerm(term) && term.termType === 'NamedNode'
}

export default abstract class NamedNode extends Term<'NamedNode'> implements NamedNodeSpec {

    get termType() {
        return 'NamedNode' as const
    }

    abstract get value(): string

    equals(other: unknown): boolean {
        switch (true) {
            case this === other:
                return true
            case other instanceof NamedNode:
                return this.value === other.value
            case other instanceof Term:
                return false
            default:
                return isNamedNode(other)
                    && this.value === other.value
        }
    }

    toString(): string {
        return '<' + this.value + '>'
    }

    toJSON(): Pick<NamedNodeSpec, 'termType' | 'value'> {
        return {
            termType: 'NamedNode' as const,
            value: this.value
        }
    }

}