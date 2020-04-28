# query-string-lite

[![Build Status](https://travis-ci.com/vilarfg/query-string-lite.svg?&branch=master)](https://travis-ci.com/vilarfg/query-string-lite) [![Coverage Status](https://coveralls.io/repos/github/vilarfg/query-string-lite/badge.svg?branch=master)](https://coveralls.io/github/vilarfg/query-string-lite?branch=master)

## install

``` shell
npm install query-string-lite
```

## usage

``` javascript
import {
    decode,
    encode
} from "query-string-lite";

const querystring = "?string=question&boolean&string=&string=42"

const query = decode(querystring);

console.log(JSON.stringify(query, "", "  "))
//=> '{ boolean: true, string: [ "question", "", "42" ]}'

console.log(encode(query))
//=> '?boolean&string=question&string=&string=42'
```

### non-ascii

same thing, different characters…

``` javascript
const querystringZH = "?聪明&名字=Fernando&名字=&名字=王"

const queryZH = decode(querystring);

console.log(JSON.stringify(query, "", "  "))
//=> '{ 名字: [ "Fernando", "", "王" ], 聪明: true }'

console.log(encode(query))
//=> '?名字=Fernando&名字=&名字=王&聪明'
```

<!-- ## Rationale

You can read all about ***why*** I decided to write this package over [here](). -->

<!-- 

## TODO

* [ ] write description
* [ ] write docs
* [ ] implement typedoc
* [x] Travis CI
* [ ] Coveralls
* [x] write tests

 -->

## licence

[MIT](https://github.com/vilarfg/query-string-lite/blob/master/LICENSE) Copyright (c) 2020 Fernando G. Vilar.
