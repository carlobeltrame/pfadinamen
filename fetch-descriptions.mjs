import fs from 'fs';
import fetch from 'node-fetch';
import Parser from 'rss-parser';

let parser = new Parser();

const response = await fetch('https://www.pfadinamen.ch/Rss/Pfadinamenliste');
const buffer = await response.arrayBuffer();
const utf16leDecoder = new TextDecoder('utf-16le');
const xml = utf16leDecoder.decode(buffer);

let feed = await parser.parseString(xml);

const data = feed.items.map(item => ({
  name: item.title,
  desc: (item.content || '').trim(),
})).filter(item => item.desc.length)

fs.writeFileSync('names.json', JSON.stringify(data));
