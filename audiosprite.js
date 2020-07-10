// formats tags from audacity to a format howler can use

import fs from 'fs';
import path from 'path';

const toMs = num => +num * 1000;
const toFixed = num => +(num.toFixed(4));

const data = fs.readFileSync(path.resolve(process.cwd(), './assets/audio/labels.txt'));
const result = data
  .toString()
  .split(/[\n\r]+/)
  .filter(line => !!line)
  .map(line => line.split('\t'))
  .reduce((memo, [start, end, name]) => {
    const offsetStart = toMs(start);
    const offsetEnd = toMs(end);
    const duration = offsetEnd - offsetStart;

    memo[name] = [toFixed(offsetStart), toFixed(duration)];
    return memo;
  }, {});

console.log(JSON.stringify(result, null, '  '));