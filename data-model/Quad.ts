import Term, { TermSpec, TermData } from './Term'
import NamedNode from './NamedNode'
import BlankNode from './BlankNode'
import Literal from './Literal'
import Variable from './Variable'
import DefaultGraph from './DefaultGraph'
import { isString, isRecord } from '../util/types'

/** @see https://rdf.js.org/data-model-spec/#defaultgraph-interface */
export interface QuadSpec extends TermSpec {
    termType: string
    value: string
    subject: Term
    predicate: Term
    object: Term
    graph: Term
    equals(other?: Term): boolean
}

export type QuadData = TermData & {
    termType: 'Quad'
    subject: TermData
    predicate: TermData
    object: TermData
    graph: TermData
}

export default class Quad extends Term implements QuadSpec {

    /**
     * termType contains the constant "Quad".
     */
    readonly termType = 'Quad' as const

    /**
     * value contains an empty string as constant value.
     */
    readonly value = '' as const

    /**
     * subject the subject, which is a NamedNode, BlankNode, Variable or Quad.
     */
    readonly subject: NamedNode | BlankNode | Variable | Quad

    /**
     * predicate the predicate, which is a NamedNode or Variable.
     */
    readonly predicate: NamedNode | Variable

    /**
     * object the object, which is a NamedNode, Literal, BlankNode or Variable.
     */
    readonly object: NamedNode | Literal | BlankNode | Variable

    /**
     * graph the named graph, which is a DefaultGraph, NamedNode, BlankNode or Variable.
     */
    readonly graph: DefaultGraph | NamedNode | BlankNode | Variable

    // TODO: constructor

    /**
     * equals() returns true when called with parameter other on an object quad if all of the conditions below hold:
     * - other is neither null nor undefined;
     * - quad.subject.equals(other.subject) evaluates to true;
     * - quad.predicate.equals(other.predicate) evaluates to true;
     * - quad.object.equals(other.object) evaluates to a true;
     * - quad.graph.equals(other.graph) evaluates to a true;
     * otherwise, it returns false.
     */
    equals(other?: unknown): boolean {
        if (this === other) return true
        if (other instanceof Term) return other instanceof Quad && this.subject.equals(other.subject)
            && this.predicate.equals(other.predicate) && this.object.equals(other.object) && this.graph.equals(other.graph)
        return isRecord(other) && this.termType === other.termType && this.subject.equals(other.subject)
            && this.predicate.equals(other.predicate) && this.object.equals(other.object) && this.graph.equals(other.graph)
    }

    // TODO: toString

    toJSON(): QuadData {
        return {
            termType: this.termType,
            subject: this.subject.toJSON(),
            predicate: this.predicate.toJSON(),
            object: this.object.toJSON(),
            graph: this.graph.toJSON()
        }
    }

}