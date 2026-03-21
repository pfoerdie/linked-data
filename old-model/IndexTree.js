const
    util = require('@pfoerdie/utility'),
    model = require('../model');

/**
 * @template {number} [Depth = 1]
 * @template {string | number} [Key = string | number]
 * @template {any} [Value = undefined]
 */
class IndexTree {

    static #defaultDepth = 1;
    static #defaultKeyValidator = util.create.CombinedValidator.OR(util.is.number.any, util.is.string);
    static #defaultValueValidator = util.is;

    #size = 0;
    #entries = Object.create(null);
    #depth = IndexTree.#defaultDepth;
    #keyValidator = IndexTree.#defaultKeyValidator;
    #valueValidator = IndexTree.#defaultValueValidator;

    /**
     * An IndexTree that can store entries of key value pairs.
     * The keys must be numbers or strings and the values can be anything.
     * @param {Depth} [depth] The number of keys necessary for this IndexTree instance.
     * @param {Function} [keyValidator] A validator function to validate each key. Should only allow numbers or strings.
     * @param {Function} [valueValidator] A validator function to validate the value for each entry.
     */
    constructor(depth = IndexTree.#defaultDepth, keyValidator = IndexTree.#defaultKeyValidator, valueValidator = IndexTree.#defaultValueValidator) {
        util.assert.number.integer(depth, 1);
        util.assert.function(keyValidator);
        util.assert.function(valueValidator);

        this.#depth = depth;
        this.#keyValidator = keyValidator;
        this.#valueValidator = valueValidator;
    }

    /**
     * The number of keys that are necessary for each entry.
     * @type {Depth}
     */
    get depth() {
        return this.#depth;
    }

    /**
     * The number of entries in the IndexTree.
     * @type {number}
     */
    get size() {
        return this.#size;
    }

    /**
     * Detect whether the keys already exist in the IndexTree.
     * @param {...Key} keys The keys to check their existence.
     * @returns {boolean} The existence of the keys in the IndexTree.
     */
    has(...keys) {
        util.assert.array(keys, this.#keyValidator, this.#depth, this.#depth);

        let target = this.#entries;
        for (let key of keys) {
            if (!(key in target)) return false;
            target = target[key];
        }
        return true;
    }

    /**
     * Get the value for specific keys in the IndexTree.
     * @param {...Key} keys The keys to get their value.
     * @returns {Value} The value for the keys in the IndexTree.
     */
    get(...keys) {
        util.assert.array(keys, this.#keyValidator, this.#depth, this.#depth);

        let target = this.#entries;
        for (let key of keys) {
            if (!(key in target)) return;
            target = target[key];
        }
        return target;
    }

    /**
     * Add a value to the IndexTree without overwriting it.
     * @param {...Key} keys The keys to insert the value at.
     * @param {Value} value The value to insert at those keys, if not already existing.
     * @returns {boolean} True if the keys have not existed yet and have been added.
     */
    add(...keys /*, value*/) {
        const value = keys.pop();
        util.assert.array(keys, this.#keyValidator, this.#depth, this.#depth);
        util.assert(value, this.#valueValidator);

        const lastKey = keys.pop();
        let target = this.#entries;
        for (let key of keys) {
            if (!(key in target)) target[key] = Object.create(null);
            target = target[key];
        }

        if (lastKey in target) return false;
        target[lastKey] = value;
        this.#size++;
        return true;
    }

    /**
     * Set a value in the IndexTree and overwrite it if necessary.
     * @param {...Key} keys The keys to insert the value at.
     * @param {Value} value The value to insert at those keys, override if necessary.
     * @returns {boolean} True if the keys already existed and had to be overriden.
     */
    set(...keys /*, value*/) {
        const value = keys.pop();
        util.assert.array(keys, this.#keyValidator, this.#depth, this.#depth);
        util.assert(value, this.#valueValidator);

        const lastKey = keys.pop();
        let target = this.#entries;
        for (let key of keys) {
            if (!(key in target)) target[key] = Object.create(null);
            target = target[key];
        }

        const existed = (lastKey in target);
        target[lastKey] = value;
        if (!existed) this.#size++;
        return existed;
    }

    /**
     * Delete the keys at their value in the IndexTree.
     * @param {...Key} keys The keys to delete the value at.
     * @returns {boolean} True if the keys existed and the value had been deleted.
     */
    delete(...keys) {
        util.assert.array(keys, this.#keyValidator, this.#depth, this.#depth);

        const chain = [];
        let target = this.#entries;
        for (let key of keys) {
            if (!(key in target)) return false;
            chain.unshift([target, key]);
            target = target[key];
        }

        this.#size--;
        cleanup: for (let [target, key] of chain) {
            delete target[key];
            for (let otherKey in target) break cleanup;
        }
        return true;
    }

    /**
     * Iterate over the entries of the IndexTree with the use of an optional filter.
     * @param {...Key} filter The filter for the keys, a null as placeholder.
     * @returns {Iterator<[Value, ...Key]>} An iterator over the matching entries, the value followed by the keys as array.
     */
    * entries(...filter) {
        // TODO
    }

    /**
     * Iterate over the keys of the IndexTree with the use of an optional filter.
     * @param {...Key} filter The filter for the keys, a null as placeholder.
     * @returns {Iterator<[...Key]>} An iterator over the matching keys as array.
     */
    * keys(...filter) {
        // TODO
    }

    /**
     * Iterate over the values of the IndexTree with the use of an optional filter.
     * @param {...Key} filter The filter for the keys, a null as placeholder.
     * @returns {Iterator<Value>} An iterator over the matching values.
     */
    * values(...filter) {
        // TODO
    }

}

module.exports = IndexTree;