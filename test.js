var test = require('tape');

var SRE = require('./index');


test('SRE constructor', function (t) {
	t.plan(2);

	t.equal(typeof SRE, 'function');

	var s = SRE();
	t.equal(typeof s, 'object');
});


test('SRE instance', function (t) {
	t.plan(5);

	var s = SRE();

	t.equal(typeof s.pat, 'function');
	t.equal(typeof s.flags, 'function');
	t.equal(typeof s.debug, 'function');
	t.equal(typeof s.exec, 'function');
	t.equal(typeof s.docs, 'function');
});




//See this
// http://stackoverflow.com/questions/7964916/differences-between-javascript-regexp-literal-and-constructor
// / are taken litterally
// \ need to be scaped

var s = SRE('Parse a root URL')
			.pat('^(http|https)?', 'Protocol. Its optional.')
			.pat('(://)?', 'Delimiter. Its optional.')
			.pat('(www)?', 'Optional www word')
			.pat('(?:\\.)?', 'Optional  dot.')
			.pat('([^\\.]*)', 'Domain name. Anything but a dot.')
			.pat('(?:\\.)', 'Dot.')
			.pat('([^$/]*)', 'Top level domain. Anything but a forward slash or the end of the string')
			.pat('(?:$|/$)', 'String end')
			.flags('ig');




test('SRE exec', function (t) {
    t.plan(6);

	var result = s.exec('http://www.domain.com');
	var expected = ['http://www.domain.com', 'http', '://', 'www', 'domain', 'com'];

    var i, r, e;
    for (i= 0; i < 6; i++ ) {
    	r = result[i];
    	e = expected[i];
    	t.equal(r, e);
    }
});


test('SRE instance method: "debug"', function (t) {
	var test_quantity = 7;

	t.plan(test_quantity);

	var debug_result = s.debug('http://www.domain.com');
	var expected = [
	
		['http'],
		['http', '://'],
		['http', '://', 'www'],
		['http', '://', 'www'],
		['http', '://', 'www', 'domain'],
		['http', '://', 'www', 'domain'],
		['http', '://', 'www', 'domain', 'com']

	];

	var actual, expect;

	for (i = 0; i < test_quantity; i++) {
		actual = debug_result[i].result.slice(1);
		expect = expected[i];

		t.deepEqual(actual, expect);
	}
});



test('SRE instance method: "docs"', function (t) {
	t.plan(1);

	var description= 'A description',
		pat_A = 'pat_a',
		pat_A_comments = 'A pattern comments',
		pat_B ='pat_b',
		pat_B_comments = 'B pattern comments';

	var s = SRE(description)
				.pat(pat_A, pat_A_comments)
				.pat(pat_B, pat_B_comments)
				.flags('ig');

	var result = s.docs();
	var expected = {
		description: description,
		patterns: [{
	            pattern: pat_A,
	            comment: pat_A_comments
        	}, {
            	pattern: pat_B,
            	comment: pat_B_comments
        }]
	};

	t.deepEqual(result, expected);

});