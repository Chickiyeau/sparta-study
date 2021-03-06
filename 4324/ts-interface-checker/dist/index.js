"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checker = exports.createCheckers = void 0;
var types_1 = require("./types");
var util_1 = require("./util");
/**
 * Export functions used to define interfaces.
 */
var types_2 = require("./types");
Object.defineProperty(exports, "TArray", { enumerable: true, get: function () { return types_2.TArray; } });
Object.defineProperty(exports, "TEnumType", { enumerable: true, get: function () { return types_2.TEnumType; } });
Object.defineProperty(exports, "TEnumLiteral", { enumerable: true, get: function () { return types_2.TEnumLiteral; } });
Object.defineProperty(exports, "TFunc", { enumerable: true, get: function () { return types_2.TFunc; } });
Object.defineProperty(exports, "TIface", { enumerable: true, get: function () { return types_2.TIface; } });
Object.defineProperty(exports, "TLiteral", { enumerable: true, get: function () { return types_2.TLiteral; } });
Object.defineProperty(exports, "TName", { enumerable: true, get: function () { return types_2.TName; } });
Object.defineProperty(exports, "TOptional", { enumerable: true, get: function () { return types_2.TOptional; } });
Object.defineProperty(exports, "TParam", { enumerable: true, get: function () { return types_2.TParam; } });
Object.defineProperty(exports, "TParamList", { enumerable: true, get: function () { return types_2.TParamList; } });
Object.defineProperty(exports, "TProp", { enumerable: true, get: function () { return types_2.TProp; } });
Object.defineProperty(exports, "TTuple", { enumerable: true, get: function () { return types_2.TTuple; } });
Object.defineProperty(exports, "TType", { enumerable: true, get: function () { return types_2.TType; } });
Object.defineProperty(exports, "TUnion", { enumerable: true, get: function () { return types_2.TUnion; } });
Object.defineProperty(exports, "TIntersection", { enumerable: true, get: function () { return types_2.TIntersection; } });
Object.defineProperty(exports, "array", { enumerable: true, get: function () { return types_2.array; } });
Object.defineProperty(exports, "enumlit", { enumerable: true, get: function () { return types_2.enumlit; } });
Object.defineProperty(exports, "enumtype", { enumerable: true, get: function () { return types_2.enumtype; } });
Object.defineProperty(exports, "func", { enumerable: true, get: function () { return types_2.func; } });
Object.defineProperty(exports, "iface", { enumerable: true, get: function () { return types_2.iface; } });
Object.defineProperty(exports, "lit", { enumerable: true, get: function () { return types_2.lit; } });
Object.defineProperty(exports, "name", { enumerable: true, get: function () { return types_2.name; } });
Object.defineProperty(exports, "opt", { enumerable: true, get: function () { return types_2.opt; } });
Object.defineProperty(exports, "param", { enumerable: true, get: function () { return types_2.param; } });
Object.defineProperty(exports, "tuple", { enumerable: true, get: function () { return types_2.tuple; } });
Object.defineProperty(exports, "union", { enumerable: true, get: function () { return types_2.union; } });
Object.defineProperty(exports, "intersection", { enumerable: true, get: function () { return types_2.intersection; } });
Object.defineProperty(exports, "BasicType", { enumerable: true, get: function () { return types_2.BasicType; } });
var util_2 = require("./util");
Object.defineProperty(exports, "VError", { enumerable: true, get: function () { return util_2.VError; } });
/**
 * Takes one of more type suites (e.g. a module generated by `ts-interface-builder`), and combines
 * them into a suite of interface checkers. If a type is used by name, that name should be present
 * among the passed-in type suites.
 *
 * The returned object maps type names to Checker objects.
 */
function createCheckers() {
    var typeSuite = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        typeSuite[_i] = arguments[_i];
    }
    var fullSuite = Object.assign.apply(Object, __spreadArrays([{}, types_1.basicTypes], typeSuite));
    var checkers = {};
    for (var _a = 0, typeSuite_1 = typeSuite; _a < typeSuite_1.length; _a++) {
        var suite_1 = typeSuite_1[_a];
        for (var _b = 0, _c = Object.keys(suite_1); _b < _c.length; _b++) {
            var name = _c[_b];
            checkers[name] = new Checker(fullSuite, suite_1[name]);
        }
    }
    return checkers;
}
exports.createCheckers = createCheckers;
/**
 * Checker implements validation of objects, and also includes accessors to validate method calls.
 * Checkers should be created using `createCheckers()`.
 */
var Checker = /** @class */ (function () {
    // Create checkers by using `createCheckers()` function.
    function Checker(suite, ttype, _path) {
        if (_path === void 0) { _path = 'value'; }
        this.suite = suite;
        this.ttype = ttype;
        this._path = _path;
        this.props = new Map();
        if (ttype instanceof types_1.TIface) {
            for (var _i = 0, _a = ttype.props; _i < _a.length; _i++) {
                var p = _a[_i];
                this.props.set(p.name, p.ttype);
            }
        }
        this.checkerPlain = this.ttype.getChecker(suite, false);
        this.checkerStrict = this.ttype.getChecker(suite, true);
    }
    /**
     * Set the path to report in errors, instead of the default "value". (E.g. if the Checker is for
     * a "person" interface, set path to "person" to report e.g. "person.name is not a string".)
     */
    Checker.prototype.setReportedPath = function (path) {
        this._path = path;
    };
    /**
     * Check that the given value satisfies this checker's type, or throw Error.
     */
    Checker.prototype.check = function (value) { return this._doCheck(this.checkerPlain, value); };
    /**
     * A fast check for whether or not the given value satisfies this Checker's type. This returns
     * true or false, does not produce an error message, and is fast both on success and on failure.
     */
    Checker.prototype.test = function (value) {
        return this.checkerPlain(value, new util_1.NoopContext());
    };
    /**
     * Returns an error object describing the errors if the given value does not satisfy this
     * Checker's type, or null if it does.
     */
    Checker.prototype.validate = function (value) {
        return this._doValidate(this.checkerPlain, value);
    };
    /**
     * Check that the given value satisfies this checker's type strictly. This checks that objects
     * and tuples have no extra members. Note that this prevents backward compatibility, so usually
     * a plain check() is more appropriate.
     */
    Checker.prototype.strictCheck = function (value) { return this._doCheck(this.checkerStrict, value); };
    /**
     * A fast strict check for whether or not the given value satisfies this Checker's type. Returns
     * true or false, does not produce an error message, and is fast both on success and on failure.
     */
    Checker.prototype.strictTest = function (value) {
        return this.checkerStrict(value, new util_1.NoopContext());
    };
    /**
     * Returns an error object describing the errors if the given value does not satisfy this
     * Checker's type strictly, or null if it does.
     */
    Checker.prototype.strictValidate = function (value) {
        return this._doValidate(this.checkerStrict, value);
    };
    /**
     * If this checker is for an interface, returns a Checker for the type required for the given
     * property of this interface.
     */
    Checker.prototype.getProp = function (prop) {
        var ttype = this.props.get(prop);
        if (!ttype) {
            throw new Error("Type has no property " + prop);
        }
        return new Checker(this.suite, ttype, this._path + "." + prop);
    };
    /**
     * If this checker is for an interface, returns a Checker for the argument-list required to call
     * the given method of this interface. E.g. if this Checker is for the interface:
     *    interface Foo {
     *      find(s: string, pos?: number): number;
     *    }
     * Then methodArgs("find").check(...) will succeed for ["foo"] and ["foo", 3], but not for [17].
     */
    Checker.prototype.methodArgs = function (methodName) {
        var tfunc = this._getMethod(methodName);
        return new Checker(this.suite, tfunc.paramList);
    };
    /**
     * If this checker is for an interface, returns a Checker for the return value of the given
     * method of this interface.
     */
    Checker.prototype.methodResult = function (methodName) {
        var tfunc = this._getMethod(methodName);
        return new Checker(this.suite, tfunc.result);
    };
    /**
     * If this checker is for a function, returns a Checker for its argument-list.
     */
    Checker.prototype.getArgs = function () {
        if (!(this.ttype instanceof types_1.TFunc)) {
            throw new Error("getArgs() applied to non-function");
        }
        return new Checker(this.suite, this.ttype.paramList);
    };
    /**
     * If this checker is for a function, returns a Checker for its result.
     */
    Checker.prototype.getResult = function () {
        if (!(this.ttype instanceof types_1.TFunc)) {
            throw new Error("getResult() applied to non-function");
        }
        return new Checker(this.suite, this.ttype.result);
    };
    /**
     * Return the type for which this is a checker.
     */
    Checker.prototype.getType = function () {
        return this.ttype;
    };
    /**
     * Actual implementation of check() and strictCheck().
     */
    Checker.prototype._doCheck = function (checkerFunc, value) {
        var noopCtx = new util_1.NoopContext();
        if (!checkerFunc(value, noopCtx)) {
            var detailCtx = new util_1.DetailContext();
            checkerFunc(value, detailCtx);
            throw detailCtx.getError(this._path);
        }
    };
    Checker.prototype._doValidate = function (checkerFunc, value) {
        var noopCtx = new util_1.NoopContext();
        if (checkerFunc(value, noopCtx)) {
            return null;
        }
        var detailCtx = new util_1.DetailContext();
        checkerFunc(value, detailCtx);
        return detailCtx.getErrorDetail(this._path);
    };
    Checker.prototype._getMethod = function (methodName) {
        var ttype = this.props.get(methodName);
        if (!ttype) {
            throw new Error("Type has no property " + methodName);
        }
        if (!(ttype instanceof types_1.TFunc)) {
            throw new Error("Property " + methodName + " is not a method");
        }
        return ttype;
    };
    return Checker;
}());
exports.Checker = Checker;
