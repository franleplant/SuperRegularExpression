SRE: Super Regular Expression
=============================

Javascript Regular Expressions with Super Powers!


Status: **Experimental**

[![browser support](https://ci.testling.com/franleplant/superregularexpression.png)](https://ci.testling.com/franleplant/superregularexpression)

## Why a Regular Expression framework?

When dealing with complex long regular expression there
are a couple of thing you'd like and that Javascript currently
does not provide:


- Fragmenting the entire Reg Exp in smaller fragments.
- Commenting / Documenting the Reg Exp.
- Debugging helpers.


And that is exactly what **SRE** delivers.





## Using it

```bash
npm install super-regexp
```

The mini framework is tested using [Tape][1], run `npm test` to test it,
and, inspect `test.js` to see what the Library can offer.


This is an extract of `test.js`

```javascript

var SRE = require('super-regexp');

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


```

### In the browser

```html
<script src="dist/superre.js"></script>
<script>
var sre = SuperRegExp()
		.pat()
		.flags();
		
sre.exec(string);
</script>
```


## Debugging

SRE has a `debug(string)` method that is built to help you debug
your faulty Regular Expression.
It will run `exec(string)` several times, adding the patterns one by one.
This way you can isolate the issue to each patterns.

See `test.js` for more details.


## Creating a Browser bundle

Install Browserify and run

```bash
browserify index.js --standalone SuperRegExp -o dist/superre.js
```

## Creating a Browser test bundle


```bash
browserify test.js --standalone Super-RegExp -o dist/test_bundle.js
```

Or follow this [tutorial](https://ci.testling.com/guide/quick_start)

## Contributing

This is an Open Source project so please, if you think there are improvements to be
made in this library please submit a Pull Request or an Issue and we can discuss about it.
The requirements of submitting code are that the new pieces are tested with [Tape][1], and possibly in the future
that they are linted.



## TODO

- Use  Native RegExp and `/as[\.]*d/.toString()` to offer better integration. 
- Implement Named-capture. See nice [implementation](https://www.npmjs.org/package/named-regexp)


## License

The MIT License (MIT)

Copyright (c) 2014 Francisco Guijarro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.




Copyright 2014 franleplant@gmail.com


[1]: https://www.npmjs.org/package/tape


## Bumping to NPM
This is just a reminder to my self.


```bash
# bump version
npm version [<newversion> | major | minor | patch]
npm publish .
```
