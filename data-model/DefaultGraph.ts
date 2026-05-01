import { type DefaultGraphSpec, isDefaultGraph } from './types'

export default class DefaultGraph implements DefaultGraphSpec {

    get termType(): 'DefaultGraph' {
        return 'DefaultGraph'
    }

    get value(): '' {
        return ''
    }

    equals(other: unknown): boolean {
        switch (true) {
            case this === other:
                return true
            case other instanceof DefaultGraph:
            case isDefaultGraph(other):
                return true
            default:
                return false
        }
    }

}