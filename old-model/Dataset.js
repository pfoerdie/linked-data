const
    util = require('@pfoerdie/utility'),
    model = require('../model');

class Dataset {

    #graphs = new model.IndexTree(4, util.is.number.integer.nonnegative, util.is.object.null);
    // #terms = new model.IndexTree(1, util.is.number.integer.nonnegative, model.is.Term);
    // #ids = new model.IndexTree(1, util.is.string, util.is.number.integer.nonnegative);

    // TODO

}

module.exports = Dataset;