const
    util = require('@pfoerdie/utility'),
    model = require('../model');

class NamedNode extends model.Term {

    constructor(value) {
        util.assert.string.IRI(value);
        super(value);
    }

    equals(other) {
        return this === other || (
            other instanceof NamedNode &&
            this.value === other.value
        );
    }

    toString() {
        return '<' + this.value + '>';
    }

    // TODO

}

module.exports = NamedNode;