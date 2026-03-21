const
    util = require('@pfoerdie/utility'),
    model = require('../model');

class Term {

    get termType() {
        return this.__proto__.constructor.name;
    }

    #value = '';

    get value() {
        return this.#value;
    }

    constructor(value) {
        util.assert.not.equal(new.target, Term);
        util.assert.string(value);
        this.#value = value;
    }

    equals(other) {
        return this === other || (
            other instanceof Term &&
            this.termType === other.termType &&
            this.value === other.value
        );
    }

    // TODO

    toString() {
        return this.value;
    }

    toJSON() {
        return {
            'termType': this.termType,
            'value': this.value
        };
    }

}

module.exports = Term;