# fx58-node

[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg)](https://github.com/mgenware/MEAN-Module)
[![Build Status](https://travis-ci.org/mgenware/fx58-node.svg?branch=master)](http://travis-ci.org/mgenware/fx58-node)
[![npm version](https://badge.fury.io/js/fx58-node.svg)](https://badge.fury.io/js/fx58-node)
[![Node.js Version](http://img.shields.io/node/v/fx58-node.svg)](https://nodejs.org/en/)

An elegant solution to list files

## Installation
```sh
# yarn
yarn add fx58-node

# npm
npm install --save fx58-node
```

Run tests:
```sh
# yarn
yarn test

# npm
npm test
```

## API
```javascript
import listAsync from 'fx58-node';
// or Node.js style: const listAsync = require('fx58-node').default;

const files = await listAsync(
  directory,  // the path of directory
  recursive,  // defaults to false
  fileFilter, // file filter, defaults to null
  dirFiler,   // directory filter, defaults to null
);
```

## Example
Assume a directory like this:
```
data
├── .DS_Store
├── .sys
│   ├── t.json
│   └── t.txt
├── .sys.json
├── a
│   ├── .sys.json
│   ├── t.json
│   └── t.txt
├── t.json
└── t.txt
```

```javascript
import listAsync from 'fx58-node';

(async () => {
  let files = [];
  files = await listAsync('./data');
  console.log(files);
  /* 
  [ 'data/.DS_Store',
    'data/.sys.json',
    'data/t.json',
    'data/t.txt' ]
  */

  files = await listAsync('./data', true);
  console.log(files);
  /* 
  [ 'data/.DS_Store',
    'data/.sys.json',
    'data/t.json',
    'data/t.txt',
    'data/.sys/t.json',
    'data/.sys/t.txt',
    'data/a/.sys.json',
    'data/a/t.json',
    'data/a/t.txt' ]
  */

  files = await listAsync('./data', true, (file) => {
    return /.*\.txt$/i.test(file) && !file.startsWith('.');
  });
  console.log(files);
  /*
    [ 'data/t.txt', 'data/.sys/t.txt', 'data/a/t.txt' ]
  */

  files = await listAsync('./data', true,
  (file) => {
    return /.*\.txt$/i.test(file) && !file.startsWith('.');
  },
  (dir) => {
    return !dir.startsWith('.');
  });
  console.log(files);
  /*
    [ 'data/t.txt', 'data/a/t.txt' ]
  */

})();
```