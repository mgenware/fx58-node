const listAsync = require('..').default;

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