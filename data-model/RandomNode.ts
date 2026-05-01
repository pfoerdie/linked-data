import { type BlankNodeSpec, isBlankNode } from './types'
import { type UUID, randomUUID } from 'node:crypto'
import BlankNode from './BlankNode'

export default class RandomNode implements BlankNodeSpec {

    get termType(): 'BlankNode' {
        return 'BlankNode'
    }

    #value: UUID

    get value(): UUID {
        return this.#value
    }

    constructor() {
        this.#value = randomUUID()
    }

    equals(other: unknown): boolean {
        switch (true) {
            case this === other:
                return true
            case other instanceof RandomNode:
            case other instanceof BlankNode:
            case isBlankNode(other):
                return this.value === other.value
            default:
                return false
        }
    }

}