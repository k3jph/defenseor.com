import { chapters, editions, title, publisher, editors } from './catalogue.mjs';

export const chapterCitation = c => `${c.authors.join('; ')}. (${editions[c.edition].year}). ${c.title}. In Natalie M. Scala & James P. Howard, II (Eds.), ${title} (${c.edition === '2e' ? '2nd ed., ' : ''}pp. ${c.pages.replace('-', '–')}). ${publisher}. https://doi.org/${c.doi}`;
export const bookReference = id => ({ id: id === '2e' ? 'second-edition' : 'first-edition', edition: id, title, doi: editions[id].doi });
export const citationEntries = [...chapters, bookReference('2e'), bookReference('1e')];
const bibText = text => text.replace(/([&%_$#{}])/g, '\\$1');
export function referenceName(name) {
  const suffix = name.match(/,?\s+(II|III|Jr\.?)$/)?.[1];
  const parts = name.replace(/,?\s+(II|III|Jr\.?)$/, '').split(' ');
  const family = parts.pop();
  return `${family}, ${suffix ? suffix + ', ' : ''}${parts.join(' ')}`;
}
export function bibtex(c) {
  const chapter = Boolean(c.number);
  const ed = editions[c.edition];
  const fields = { title: c.title, ...(chapter ? { author: c.authors.map(referenceName).join(' and '), booktitle: title } : {}), editor: editors.map(e => referenceName(e.name)).join(' and '), publisher, year: ed.year, edition: c.edition === '2e' ? '2' : '1', ...(chapter ? { pages: c.pages.replace('-', '--') } : { isbn: ed.isbn }), doi: c.doi, url: `https://doi.org/${c.doi}` };
  return `@${chapter ? 'incollection' : 'book'}{mdor-${c.id},\n${Object.entries(fields).map(([key, value]) => `  ${key} = {${bibText(String(value))}}`).join(',\n')}\n}\n`;
}
export function ris(c) {
  const chapter = Boolean(c.number);
  const ed = editions[c.edition];
  const lines = [`TY  - ${chapter ? 'CHAP' : 'BOOK'}`, `TI  - ${c.title}`];
  if (chapter) lines.push(...c.authors.map(name => `AU  - ${referenceName(name)}`), `T2  - ${title}`);
  lines.push(...editors.map(e => `A2  - ${referenceName(e.name)}`), `PY  - ${ed.year}`, `ET  - ${c.edition === '2e' ? '2' : '1'}`, `PB  - ${publisher}`);
  if (chapter) { const [start, end] = c.pages.split('-'); lines.push(`SP  - ${start}`, `EP  - ${end}`); }
  else lines.push(`SN  - ${ed.isbn}`);
  lines.push(`DO  - ${c.doi}`, `UR  - https://doi.org/${c.doi}`, 'ER  -');
  return lines.join('\r\n') + '\r\n';
}
