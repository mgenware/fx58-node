import main from '../lib/main';
import * as helper from './helper/helper';

const DIR = 'dist/tests/data';

test('no filter', async () => {
  const files = await main(DIR, true, null, null);
  helper.assertEquality(files, ['t.txt', 't.json', 'sys/c/t.txt', 'sys/t.json', 'sys/t.txt', 'a/b/sys/c/t.json', 'a/b/sys/t.txt', 'a/b/t.json', 'a/t.txt']);
});
test('file filter', async () => {
  const files = await main(DIR, true, helper.makeRegexFilter(/.*\.txt$/i), null);
  helper.assertEquality(files, ['t.txt', 'a/b/sys/t.txt', 'a/t.txt', 'sys/c/t.txt', 'sys/t.txt']);
});
test('dir filter', async () => {
  const files = await main(DIR, true, null, helper.makeRegexFilter(/sys/i));
  helper.assertEquality(files, ['t.txt', 't.json', 'sys/t.json', 'sys/t.txt']);
});
test('file+dir filter', async () => {
  const files = await main(DIR, true, helper.makeRegexFilter(/.*\.txt$/i), helper.makeRegexFilter(/sys/i));
  helper.assertEquality(files, ['t.txt', 'sys/t.txt']);
});
