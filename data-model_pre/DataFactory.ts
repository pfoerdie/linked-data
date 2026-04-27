import Term, { TermSpec, TermData } from './Term'
import NamedNode, { NamedNodeSpec } from './NamedNode'
import BlankNode, { BlankNodeSpec } from './BlankNode'
import Literal, { LiteralSpec, DirectionalLanguage } from './Literal'
import Variable, { VariableSpec } from './Variable'
import DefaultGraph, { DefaultGraphSpec, defaultGraph } from './DefaultGraph'
import Quad, { QuadSpec } from './Quad'

/** @see https://rdf.js.org/data-model-spec/#datafactory-interface */
export interface DataFactorySpec {
    namedNode(value: string): NamedNodeSpec
    blankNode(value?: string): BlankNodeSpec
    literal(value: string, languageOrDatatype?: string | NamedNodeSpec | DirectionalLanguage): LiteralSpec
    variable(value: string): VariableSpec
    defaultGraph(): DefaultGraphSpec
    quad(subject: TermSpec, predicate: TermSpec, _object: TermSpec, graph?: TermSpec): QuadSpec
    fromTerm(original: TermSpec): TermSpec
    fromQuad(original: QuadSpec): QuadSpec
}

export default class DataFactory implements DataFactorySpec {

    namedNode(value: string): NamedNode {
        return new NamedNode(value)
    }

    private readonly _blankNodePrefix: string = 'b'
    private _blankNodeCount: number = 0

    blankNode(value?: string): BlankNode {
        return new BlankNode(value ?? this._blankNodePrefix + this._blankNodeCount++)
    }

    // TODO: literal(value: string, languageOrDatatype?: string | NamedNodeSpec | DirectionalLanguage): Literal { }

    variable(value: string): Variable {
        return new Variable(value)
    }

    defaultGraph(): DefaultGraph {
        return defaultGraph
    }

    // TODO: quad(subject: TermSpec, predicate: TermSpec, _object: TermSpec, graph?: TermSpec): Quad { }

    // TODO: fromTerm(original: TermSpec): Term { }

    // TODO: fromQuad(original: QuadSpec): Quad { }

}