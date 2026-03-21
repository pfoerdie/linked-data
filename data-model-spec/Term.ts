export default abstract class Term {

    abstract termType: string
    value: string

    constructor(value: string) {
        this.value = value
    }

    equals(other: Term): boolean {
        return this === other || other &&
            this.termType === other.termType &&
            this.value === other.value
    }

}