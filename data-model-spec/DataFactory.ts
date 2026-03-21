import {randomUUID} from 'node:crypto'

import Term from './Term'
import NamedNode from './NamedNode'
import BlankNode from './BlankNode'
import Literal from './Literal'
import Variable from './Variable'
import DefaultGraph from './DefaultGraph'
import Quad from './Quad'

export default class DataFactory {

    namedNode(value: string): NamedNode {
        return new NamedNode(value)
    }

    blankNode(value?: string): BlankNode {
        return new BlankNode(value ?? randomUUID())
    }

    literal(value: string, languageOrDatatype?: string | NamedNode): Literal {
        // TODO
    }

    // TODO

}