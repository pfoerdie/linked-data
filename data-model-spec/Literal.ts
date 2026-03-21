import Term from './Term'
import NamedNode from './NamedNode'

export default class Literal extends Term {

    termType = 'Literal'
    language: string
    datatype: NamedNode

    constructor(value: string, language: string, datatype: NamedNode) {
        super(value)
        this.language = language
        this.datatype = datatype
    }

    equals(other: Term): boolean {
        return this === other || other &&
            this.termType === other.termType &&
            this.value === other.value &&
            this.language === (other as Literal).language &&
            this.datatype.equals((other as Literal).datatype)
    }

}