const
    util = require('@pfoerdie/utility'),
    model = require('../model');

class BlankNode extends model.Term {

    constructor(value) {
        util.assert.string(value, util.pattern.nonempty);
        super(value);
    }

    equals(other) {
        return this === other || (
            other instanceof BlankNode &&
            this.value === other.value
        );
    }

    toString() {
        return '_:' + this.value;
    }

    // TODO

}

module.exports = BlankNode;