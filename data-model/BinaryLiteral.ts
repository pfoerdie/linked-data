import { type LiteralSpec, isLiteral } from './types'
import { type NamedNodeSpec, isNamedNode } from './types'
import { isString } from './types'

export default class BinaryLiteral implements LiteralSpec {

    get termType(): 'Literal' {
        return 'Literal'
    }

    #bytes: Buffer

    get bytes(): Buffer {
        return this.#bytes
    }

    #encoding: BufferEncoding

    get encoding(): BufferEncoding {
        return this.#encoding
    }

    get value(): string {
        return this.bytes.toString(this.encoding)
    }

    get language(): '' {
        return ''
    }

    #datatype: NamedNodeSpec

    get datatype(): NamedNodeSpec {
        return this.#datatype
    }

    constructor(bytes: string | Buffer, encoding: BufferEncoding, datatype: NamedNodeSpec) {
        if (!Buffer.isEncoding(encoding)) throw new Error('encoding must be a Buffer Encoding')
        if (isString(bytes)) bytes = Buffer.from(bytes, encoding)
        if (!Buffer.isBuffer(bytes)) throw new Error('bytes must be a Buffer')
        if (!isNamedNode(datatype)) throw new Error('datatype must be a NamedNode')
        this.#bytes = bytes
        this.#encoding = encoding
        this.#datatype = datatype
    }

    equals(other: unknown): boolean {
        switch (true) {
            case this === other:
                return true
            case other instanceof BinaryLiteral:
                return this.datatype.equals(other.datatype)
                    && (this.encoding === other.encoding
                        ? this.bytes.equals(other.bytes)
                        : this.value === other.value)
            case isLiteral(other):
                return this.datatype.equals(other.datatype)
                    && this.language === other.language
                    && this.value === other.value
            default:
                return false
        }
    }

}