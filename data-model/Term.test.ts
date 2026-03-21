import Term from './Term'

describe('data-model/Term', function () {

    test('develop', function () {

        class Test extends Term { }

        const test1 = new Test({ value: 'Hello World!' })
        const test2 = new Test({ value: 'Hello World!' }) as unknown
        const test3 = new Test({ value: 'Lorem Ipsum' })

        if (test1.equals(test2)) {
            const test4 = test2
        }

    })

})