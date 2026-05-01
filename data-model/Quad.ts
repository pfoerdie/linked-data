import { type QuadSpec, isBaseQuad } from './types'
import { type TermSpec } from './types'
import { type SubjectSpec, isSubject, SubjectTermTypes } from './types'
import { type PredicateSpec, isPredicate, PredicateTermTypes } from './types'
import { type ObjectSpec, isObject, ObjectTermTypes } from './types'
import { type GraphSpec, isGraph, GraphTermTypes } from './types'

export default class Quad implements QuadSpec {

    get termType(): 'Quad' {
        return 'Quad'
    }

    get value(): '' {
        return ''
    }

    #subject: SubjectSpec

    get subject(): SubjectSpec {
        return this.#subject
    }

    #predicate: PredicateSpec

    get predicate(): PredicateSpec {
        return this.#predicate
    }

    #object: ObjectSpec

    get object(): ObjectSpec {
        return this.#object
    }

    #graph: GraphSpec

    get graph(): GraphSpec {
        return this.#graph
    }

    constructor(subject: TermSpec, predicate: TermSpec, object: TermSpec, graph: TermSpec) {
        if (!isSubject(subject)) throw new Error('subject must be one of ' + SubjectTermTypes.join(', '))
        if (!isPredicate(predicate)) throw new Error('predicate must be one of ' + PredicateTermTypes.join(', '))
        if (!isObject(object)) throw new Error('object must be one of ' + ObjectTermTypes.join(', '))
        if (!isGraph(graph)) throw new Error('graph must be one of ' + GraphTermTypes.join(', '))
        this.#subject = subject
        this.#predicate = predicate
        this.#object = object
        this.#graph = graph
    }

    equals(other: unknown): boolean {
        switch (true) {
            case this === other:
                return true
            case other instanceof Quad:
            case isBaseQuad(other):
                return this.subject.equals(other.subject)
                    && this.predicate.equals(other.predicate)
                    && this.object.equals(other.object)
                    && this.graph.equals(other.graph)
            default:
                return false
        }
    }

}