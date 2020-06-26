import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';
import { IS_PROD } from '../config';

const pth = path.resolve(process.cwd(), './server/views/index.html');
const html = fs.readFileSync(pth).toString();
const page = IS_PROD ? minify(html, {
  // https://github.com/kangax/html-minifier
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyURLs: true,
  removeAttributeQuotes: true,
  removeOptionalTags: true,
  removeComments: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
}) : html;

export default async function home(req, res) {
  res.send(page);
};