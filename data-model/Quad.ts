import Term, { TermSpec, TermData } from './Term'
import NamedNode from './NamedNode'
import BlankNode from './BlankNode'
import Literal from './Literal'
import Variable from './Variable'
import DefaultGraph from './DefaultGraph'

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
    readonly subject: Term

    /**
     * predicate the predicate, which is a NamedNode or Variable.
     */
    readonly predicate: Term

    /**
     * object the object, which is a NamedNode, Literal, BlankNode or Variable.
     */
    readonly object: Term

    /**
     * graph the named graph, which is a DefaultGraph, NamedNode, BlankNode or Variable.
     */
    readonly graph: Term

}