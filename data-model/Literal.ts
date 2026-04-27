import type { Literal as LiteralSpec } from '@rdfjs/types'
import Term, { isTerm } from './Term'
import NamedNode, { NamedNodeSpec } from './NamedNode'

export { LiteralSpec }

export function isLiteral(term: unknown): term is LiteralSpec {
    return isTerm(term) && term.termType === 'Literal'
}

export default abstract class Literal extends Term<'Literal'> implements LiteralSpec {

    get termType() {
        return 'Literal' as const
    }

    abstract get value(): string
    abstract get language(): string
    abstract get datatype(): NamedNode

    equals(other: unknown): boolean {
        switch (true) {
            case this === other:
                return true
            case other instanceof Literal:
                return this.value === other.value
                    && this.language === other.language
                    && this.datatype.equals(other.datatype)
            case other instanceof Term:
                return false
            default:
                return isLiteral(other)
                    && this.value === other.value
                    && this.language === other.language
                    && this.datatype.equals(other.datatype)
        }
    }

    // TODO: toString

    toJSON(): Pick<LiteralSpec, 'termType' | 'value' | 'language'> & { datatype: Pick<NamedNodeSpec, 'termType' | 'value'> } {
        return {
            termType: 'Literal' as const,
            value: this.value,
            language: this.language,
            datatype: this.datatype.toJSON()
        }
    }

}