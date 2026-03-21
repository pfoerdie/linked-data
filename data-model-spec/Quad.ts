import Term from './Term'

export default class Quad {

    subject: Term
    predicate: Term
    object: Term
    graph: Term

    constructor(subject: Term, predicate: Term, object: Term, graph: Term) {
        this.subject = subject
        this.predicate = predicate
        this.object = object
        this.graph = graph
    }

    equals(other: Quad): boolean {
        return this === other ||
            this.subject.equals(other.subject) &&
            this.predicate.equals(other.predicate) &&
            this.object.equals(other.object) &&
            this.graph.equals(other.graph)
    }

}