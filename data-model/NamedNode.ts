import { type NamedNodeSpec, isNamedNode } from './types'
import { type IRI, isIRI } from './types'

export default class NamedNode implements NamedNodeSpec<IRI> {

    get termType(): 'NamedNode' {
        return 'NamedNode'
    }

    #value: IRI

    get value(): IRI {
        return this.#value
    }

    constructor(value: string) {
        if (!isIRI(value)) throw new Error('value must be an IRI')
        this.#value = value
    }

    equals(other: unknown): boolean {
        switch (true) {
            case this === other:
                return true
            case other instanceof NamedNode:
            case isNamedNode(other):
                return this.value === other.value
            default:
                return false
        }
    }

}