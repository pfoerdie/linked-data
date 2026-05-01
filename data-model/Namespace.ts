import { type NamedNodeSpec, isNamedNode } from './types'
import { type IRI, isIRI } from './types'
import NamedNode from './NamedNode'
import Literal from './Literal'
import Binary from './Binary'
import { isString } from './types'

export default class Namespace implements NamedNodeSpec<IRI> {

    get termType(): 'NamedNode' {
        return 'NamedNode'
    }

    #value: IRI

    get value(): IRI {
        return this.#value
    }

    constructor(value: string) {
        if (!isIRI(value)) throw new Error('value must be an IRI string')
        if (!value.endsWith('/') && !value.endsWith('#')) throw new Error('value must end with / or #')
        this.#value = value
    }

    equals(other: unknown): boolean {
        switch (true) {
            case this === other:
                return true
            case other instanceof Namespace:
            case other instanceof NamedNode:
            case isNamedNode(other):
                return this.value === other.value
            default:
                return false
        }
    }

    namedNode(value: string): NamedNode | Namespace {
        if (!isString(value)) throw new Error('value must be a string')
        if (!value) return this
        if (value.startsWith('/') || value.startsWith('#')) throw new Error('value must not start with / or #')
        if (value.endsWith('/') || value.endsWith('#')) return new Namespace(this.value + value)
        return new NamedNode(this.value + value)
    }

    literal(value: string, datatype: string) {
        return new Literal(value, this.namedNode(datatype))
    }

    binary(bytes: string | Buffer, encoding: BufferEncoding, datatype: string) {
        return new Binary(bytes, encoding, this.namedNode(datatype))
    }

}