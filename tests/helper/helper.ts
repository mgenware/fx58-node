import * as nodepath from 'path';

export function assertEquality(a: string[], b: string[]) {
  const actual = b.length ? b.sort().map((f) => nodepath.join('dist/tests/data', f)) : [];
  expect(a.sort()).toEqual(actual);
}

export function makeRegexFilter(regex: RegExp): (name: string) => boolean {
  return (name: string) => {
    return regex.test(name);
  };
}
