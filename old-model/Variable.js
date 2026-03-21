const
    util = require('@pfoerdie/utility'),
    model = require('../model');

class Variable extends model.Term {

    constructor(value) {
        util.assert.string(value, util.pattern.nonempty);
        super(value);
    }

    equals(other) {
        return this === other || (
            other instanceof Variable &&
            this.value === other.value
        );
    }

    toString() {
        return '?' + this.value;
    }

    // TODO

}

module.exports = Variable;