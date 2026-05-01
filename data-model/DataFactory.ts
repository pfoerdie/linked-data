import { type DataFactorySpec } from './types'
import { type TermSpec, isTerm } from './types'
import { type BaseQuadSpec, isBaseQuad } from './types'
import { type NamedNodeSpec } from './types'
import { isString } from './types'
import NamedNode from './NamedNode'
import Namespace from './Namespace'
import BlankNode from './BlankNode'
import RandomNode from './RandomNode'
import Variable from './Variable'
import Literal from './Literal'
import Binary from './Binary'
import DefaultGraph from './DefaultGraph'
import Quad from './Quad'

type Term = NamedNode | Namespace | BlankNode | RandomNode | Variable | Literal | Binary | DefaultGraph | Quad

export default class DataFactory implements DataFactorySpec<Quad, BaseQuadSpec> {

    //@ts-ignore
    namedNode(value: string): NamedNode {
        return new NamedNode(value)
    }

    namespace(value: string): Namespace {
        return new Namespace(value)
    }

    #blankNodePrefix = 'b'
    #blankNodeCount = 0

    blankNode(value?: string): BlankNode {
        // if (!value) return new RandomNode()
        value ??= this.#blankNodePrefix + (this.#blankNodeCount++)
        return new BlankNode(value)
    }

    randomNode(): RandomNode {
        return new RandomNode()
    }

    variable(value: string): Variable {
        return new Variable(value)
    }

    #xsdString: NamedNode = new NamedNode('http://www.w3.org/2001/XMLSchema#string')
    #rdfLangString: NamedNode = new NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')

    literal(value: string, languageOrDatatype?: string | NamedNodeSpec): Literal {
        if (isString(languageOrDatatype)) return new Literal(value, this.#rdfLangString, languageOrDatatype)
        return new Literal(value, languageOrDatatype || this.#xsdString)
    }

    binary(bytes: string | Buffer, encoding: BufferEncoding, datatype: NamedNodeSpec) {
        return new Binary(bytes, encoding, datatype)
    }

    #defaultGraph: DefaultGraph = new DefaultGraph()

    defaultGraph(): DefaultGraph {
        return this.#defaultGraph
    }

    quad(subject: TermSpec, predicate: TermSpec, object: TermSpec, graph?: TermSpec): Quad {
        return new Quad(subject, predicate, object, graph ?? this.#defaultGraph)
    }

    //@ts-ignore
    fromTerm(original: TermSpec): Term {
        if (!isTerm(original)) throw new Error('original must be a Term')
        switch (original.termType) {
            case 'NamedNode': return this.namedNode(original.value)
            case 'BlankNode': return this.blankNode(original.value)
            case 'Variable': return this.variable(original.value)
            case 'Literal': return this.literal(
                original.value,
                original.language || this.namedNode(original.datatype?.value)
            )
            case 'DefaultGraph': return this.defaultGraph()
            case 'Quad': return this.quad(
                this.fromTerm(original.subject),
                this.fromTerm(original.predicate),
                this.fromTerm(original.object),
                this.fromTerm(original.graph),
            )
        }
    }

    fromQuad(original: BaseQuadSpec): Quad {
        if (!isBaseQuad(original)) throw new Error('original must be a Quad')
        return this.quad(
            this.fromTerm(original.subject),
            this.fromTerm(original.predicate),
            this.fromTerm(original.object),
            this.fromTerm(original.graph),
        )
    }

}