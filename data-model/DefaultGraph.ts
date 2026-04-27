import type { DefaultGraph as DefaultGraphSpec } from '@rdfjs/types'
import Term, { isTerm } from './Term'

export { DefaultGraphSpec }

export function isDefaultGraph(term: unknown): term is DefaultGraphSpec {
    return isTerm(term) && term.termType === 'DefaultGraph'
}

export default class DefaultGraph extends Term<'DefaultGraph'> implements DefaultGraphSpec {

    get termType() {
        return 'DefaultGraph' as const
    }

    get value() {
        return '' as const
    }

    equals(other: unknown): boolean {
        switch (true) {
            case this === other:
                return true
            case other instanceof DefaultGraph:
                return true
            case other instanceof Term:
                return false
            default:
                return isDefaultGraph(other)
        }
    }

    toString(): string {
        return ''
    }

    toJSON(): Pick<DefaultGraphSpec, 'termType'> {
        return {
            termType: 'DefaultGraph' as const
        }
    }

}