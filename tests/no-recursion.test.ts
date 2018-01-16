import main from '../lib/main';
import * as helper from './helper/helper';

const DIR = 'dist/tests/data';

test('no filter', async () => {
  const files = await main(DIR, false, null, null);
  helper.assertEquality(files, ['t.txt', 't.json']);
});
test('file filter', async () => {
  const files = await main(DIR, false, helper.makeRegexFilter(/.*\.txt$/i), null);
  helper.assertEquality(files, ['t.txt']);
});
test('dir filter', async () => {
  const files = await main(DIR, false, null, helper.makeRegexFilter(/sys/i));
  helper.assertEquality(files, ['t.txt', 't.json']);
});
test('file+dir filter', async () => {
  const files = await main(DIR, false, helper.makeRegexFilter(/.*\.txt$/i), helper.makeRegexFilter(/sys/i));
  helper.assertEquality(files, ['t.txt']);
});
