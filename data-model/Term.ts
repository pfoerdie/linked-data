import type { Term as TermSpec } from '@rdfjs/types'

export { TermSpec }

export function isTerm(term: unknown): term is TermSpec {
    return typeof term === 'object'
        && term !== null
        && typeof (term as TermSpec).termType === 'string'
}

export default abstract class Term<TermType extends TermSpec['termType']> {

    abstract get termType(): TermType
    abstract get value(): string

    abstract equals(other: unknown): boolean

    abstract toString(): string
    abstract toJSON(): Pick<TermSpec & { termType: TermType }, 'termType'>

}
