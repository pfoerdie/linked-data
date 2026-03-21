const
    util = require('@pfoerdie/utility'),
    model = exports;

model.Term = require('./Term');
model.NamedNode = require('./NamedNode');
model.Literal = require('./Literal');
model.Variable = require('./Variable');
model.DefaultGraph = require('./DefaultGraph');
model.Quad = require('./Quad');

model.IndexTree = require('./IndexTree');
model.IndexMapper = require('./IndexMapper');
model.Dataset = require('./Dataset');

util.prop.lock.all(exports);