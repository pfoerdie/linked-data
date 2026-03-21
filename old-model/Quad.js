const
    util = require('@pfoerdie/utility'),
    model = require('../model');

class Quad extends model.Term {

    #subject = null;

    get subject() {
        return this.#subject;
    }

    #predicate = null;

    get predicate() {
        return this.#predicate;
    }

    #object = null;

    get object() {
        return this.#object;
    }

    #graph = null;

    get graph() {
        return this.#graph;
    }

    constructor(subject, predicate, object, graph) {
        util.assert.instance(subject, model.Term);
        util.assert.instance(predicate, model.Term);
        util.assert.instance(object, model.Term);
        util.assert.instance(graph, model.Term);
        super('');
        this.#subject = subject;
        this.#predicate = predicate;
        this.#object = object;
        this.#graph = graph;
    }

    equals(other) {
        return this === other || (
            other instanceof Quad &&
            this.subject.equals(other.subject) &&
            this.predicate.equals(other.predicate) &&
            this.object.equals(other.object) &&
            this.graph.equals(other.graph)
        );
    }

    toString() {
        return this.subject.toString() + ' ' + this.predicate.toString() + ' ' + this.object.toString() + ' '
            + (this.graph instanceof model.DefaultGraph ? '' : this.graph.toString() + ' ') + '.';
    }

    // TODO

}

module.exports = Quad;