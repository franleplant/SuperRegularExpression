//Apply polyfill for IE8 and IE9
if (!Array.prototype.forEach) {
  require('./polyfill');
}



function SuperRegularExpression(description) {
    var that = {};


    var flags, regexp_c,
        patterns = [];

    
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
