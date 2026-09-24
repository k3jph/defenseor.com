import test from 'node:test';
import assert from 'node:assert/strict';
import { chapters, catalogueUrl, editions } from '../src/data/catalogue.mjs';
import { chapterNotes } from '../src/data/chapter-notes.mjs';
import { publicationRecords } from '../src/data/publication-records.mjs';
import { readingConnections } from '../src/data/reading-connections.mjs';
import { chapterCitation, citationEntries, bibtex, ris, referenceName } from '../src/data/citations.mjs';

test('twenty developed, source-scoped original overviews without invented archive summaries', () => {
  assert.equal(Object.keys(chapterNotes).length, 20);
  for (const c of chapters) {
    if (c.edition === '1e') { assert.equal(chapterNotes[c.id], undefined); continue; }
    const note = chapterNotes[c.id];
    assert.ok(note.overview.split(/\s+/).length >= 75, c.id);
    assert.ok(note.basis && note.review.includes('proof'), c.id);
  }
});
test('all forty published identifiers and pagination are explicit, unique, and edition-specific', () => {
  assert.equal(Object.keys(publicationRecords).length, 40);
  assert.equal(new Set(chapters.map(c => c.doi)).size, 40);
  for (const c of chapters) {
    assert.match(c.pages, /^\d+-\d+$/);
    const [start,end] = c.pages.split('-').map(Number); assert.ok(end >= start);
    assert.ok(c.doi.startsWith(editions[c.edition].doi + '-'));
    assert.ok(c.source.endsWith(c.doi));
    assert.match(chapterCitation(c), new RegExp(c.doi.replaceAll('.', '\\.')));
  }
  assert.equal(chapters.find(c => c.id === '2e-19').doi, '10.1201/9781003396307-22');
  assert.equal(chapters.find(c => c.id === '2e-15').doi, '10.1201/9781003396307-17');
});
test('bibliographic title updates never silently change existing routes', () => {
  const c = chapters.find(c => c.id === '1e-03');
  assert.equal(c.title, 'Multiattribute Decision Modeling in Defense Applications');
  assert.equal(c.url, '/chapters/1e/military-decision-analysis/');
  assert.equal(c.catalogueTitle, 'Military Decision Analysis');
  assert.equal(catalogueUrl('1e'), '/chapters/1e/');
  assert.equal(catalogueUrl('2e'), '/chapters/');
});
test('downloaded citations preserve chapter authors, editors, suffixes, and page ranges', () => {
  assert.equal(citationEntries.length, 42);
  assert.equal(referenceName('James P. Howard, II'), 'Howard, II, James P.');
  for (const c of chapters) {
    assert.match(bibtex(c), /^@incollection/); assert.match(bibtex(c), /booktitle =/); assert.match(bibtex(c), /editor =/);
    assert.ok(bibtex(c).includes(c.pages.replace('-', '--')));
    assert.match(ris(c), /^TY  - CHAP/); assert.match(ris(c), /AU  -/); assert.match(ris(c), /A2  - Scala/);
    assert.ok(ris(c).includes('DO  - ' + c.doi));
  }
});
test('reading sequences have chapter-specific sourced connections', () => {
  for (const links of Object.values(readingConnections)) for (const [n,text] of Object.entries(links)) {
    assert.ok(chapters.some(c => c.edition === '2e' && c.number === Number(n)));
    assert.ok(text.length > 60);
  }
});
