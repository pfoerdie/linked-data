const
    util = require('@pfoerdie/utility'),
    model = require('../model');

class DefaultGraph extends model.Term {

    constructor() {
        super('');
    }

    equals(other) {
        return this === other || (
            other instanceof DefaultGraph
        );
    }

    toString() {
        return '';
    }

    // TODO

}

module.exports = DefaultGraph;