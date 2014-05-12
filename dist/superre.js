!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.SuperRegExp=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
function SuperRegularExpression(description) {
    var that = {};


    var flags, regexp_c,
        patterns = []

    //TODO: polyfill array.forEach
    function compile_reg_exp(patterns) {

        var reg_exp_str = '';

        patterns.forEach(function (e, i, patterns) {
            reg_exp_str += e.pattern;
        });

        return new RegExp(reg_exp_str, flags);
    };


    that.pat = function (pattern, comment) {

        patterns.push({
            pattern: pattern,
            comment: comment
        });

        return that;
    };


    that.flags = function (flags_parammeter) {
        flags = flags_parammeter;
        return that;
    };


    that.exec = function (string) {
        regexp_c = regexp_c || compile_reg_exp(patterns);


        return regexp_c.exec(string);
    };

    /*
        Accumulate each indivual pattern one at a time and show the results.
        Example:
        pat_A.exec(string);
        (pat_A + pat_B).exec(string);
        (pat_A + pat_B + pat_C).exec(string);
        ...
    */
    that.debug = function (string) {
        var i, regexp_c, sliced_patterns,
            debug_result = [],
            len = patterns.length;

        
        for (i = 0; i < len; i++){
            sliced_patterns = patterns.slice(0, i + 1);

            regexp_c = compile_reg_exp(  sliced_patterns );

            debug_result.push({
                patterns: sliced_patterns,
                result: regexp_c.exec(string)
            });
        }

        return debug_result;
    };


    that.docs = function () {
        return {
            description: description,
            patterns: patterns
        }
    };



    return that;
};

module.exports = SuperRegularExpression;
},{}]},{},[1])
(1)
});
