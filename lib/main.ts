import * as mfs from 'm-fs';
import * as nodepath from 'path';

export interface IFilter {
  regex?: string;
  negate?: boolean;
}

export default async function start(
  directoryPath: string,
  recursive: boolean = false,
  fileFilter: ((name: string) => boolean)|null = null,
  dirFilter: ((name: string) => boolean)|null = null,
): Promise<string[]> {
  const results: string[] = [];
  await listAsync(directoryPath, fileFilter, dirFilter, recursive, results);
  return results;
}

async function listAsync(
  dir: string,
  fileFilter: ((name: string) => boolean)|null,
  dirFilter: ((name: string) => boolean)|null,
  recursive: boolean,
  results: string[],
): Promise<void> {
  // filter files
  let files = await mfs.listSubFiles(dir);
  if (fileFilter) {
    files = files.filter(fileFilter);
  }
  if (files.length) {
    results.push(...files.map((f) => nodepath.join(dir, f)));
  }

  // filter directories
  if (recursive) {
    let dirs = await mfs.listSubDirs(dir);
    if (dirFilter) {
      dirs = dirs.filter(dirFilter);
    }
    if (dirs.length) {
      await Promise.all(dirs.map(async (subDir) => await listAsync(nodepath.join(dir, subDir), fileFilter, dirFilter, recursive, results)));
    }
  }
}
