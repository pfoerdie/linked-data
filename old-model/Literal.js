const
    util = require('@pfoerdie/utility'),
    model = require('../model'),
    rdf_langString = new model.NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'),
    xsd_string = new model.NamedNode('http://www.w3.org/2001/XMLSchema#string');

class Literal extends model.Term {

    #language = '';

    get language() {
        return this.#language;
    }

    #datatype = xsd_string;

    get datatype() {
        return this.#datatype;
    }

    constructor(value, language, datatype) {
        util.assert.string(language);
        util.assert.instance(datatype, model.NamedNode);
        if (language) util.assert(datatype.equals(rdf_langString));
        super(value);
        this.#language = language;
        this.#datatype = datatype;
    }

    equals(other) {
        return this === other || (
            other instanceof Literal &&
            this.datatype.equals(other.datatype) &&
            this.language === other.language &&
            this.value === other.value
        );
    }

    toString() {
        // return '"' + encodeURIComponent(this.value) + '"' + (this.language && '@' + this.language || '^^' + this.datatype.toString());
        const
            valuePart = !this.value.includes('"') ? '"' + this.value + '"'
                : !this.value.includes("'") ? "'" + this.value + "'"
                    : !this.value.includes('"""') ? '"""' + this.value + '"""'
                        : "'''" + this.value + "'''",
            langOrDtPart = this.datatype.equals(rdf_langString) ? '@' + this.language
                : !this.datatype.equals(xsd_string) ? '^^' + this.datatype.toString()
                    : '';
        return valuePart + langOrDtPart;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            'language': this.language,
            'datatype': this.datatype.toJSON()
        };
    }

    // TODO

}

module.exports = Literal;