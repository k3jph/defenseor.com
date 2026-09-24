import test from 'node:test';
import assert from 'node:assert/strict';
import { bibtex, ris, bookReference } from '../src/data/citations.mjs';
import { chapters, currentChapters, currentContributors, contributors, editions, editors, pathways, personSlug, bookCitation } from '../src/data/catalogue.mjs';

test('two complete, independently numbered editions', () => {
  assert.equal(chapters.length, 40);
  for (const edition of ['1e', '2e']) {
    assert.deepEqual(chapters.filter(c => c.edition === edition).map(c => c.number), Array.from({length: 20}, (_, i) => i + 1));
  }
  assert.deepEqual(editions['2e'].parts.map((_, p) => currentChapters.filter(c => c.part === p).length), [14, 4, 2]);
  assert.deepEqual(editions['1e'].parts.map((_, p) => chapters.filter(c => c.edition === '1e' && c.part === p).length), [11, 2, 4, 3]);
});
test('all identifiers, routes, and contributor links resolve uniquely', () => {
  assert.equal(new Set(chapters.map(c => c.id)).size, chapters.length);
  assert.equal(new Set(chapters.map(c => c.url)).size, chapters.length);
  assert.equal(new Set(contributors.map(c => c.slug)).size, contributors.length);
  for (const c of chapters) for (const name of c.authors) {
    const person = contributors.find(p => p.slug === personSlug(name));
    assert.ok(person, name);
    assert.ok(person.chapters.some(pc => pc.id === c.id));
  }
  assert.equal(contributors.length, 55);
  assert.equal(currentContributors.length, 46);
});
test('editor precedence and precise edition-specific bylines', () => {
  assert.equal(editors[0].name, 'Natalie M. Scala');
  assert.equal(editors[1].name, 'James P. Howard, II');
  const previous = chapters.find(c => c.edition === '1e' && c.number === 12);
  const current = chapters.find(c => c.edition === '2e' && c.number === 19);
  assert.deepEqual(previous.authors, ['Walt DeGrange', 'Wilson L. Price']);
  assert.deepEqual(current.authors, ['Wilson L. Price', 'Walt DeGrange']);
  assert.equal(chapters.find(c => c.edition === '1e' && c.number === 18).title, 'How Data Science Happens');
  assert.ok(!currentChapters.some(c => c.authors.includes('James P. Howard, II')));
});
test('reading pathways point only to existing second-edition chapters', () => {
  assert.equal(pathways.length, 3);
  assert.equal(new Set(pathways.map(p => p.slug)).size, pathways.length);
  for (const path of pathways) {
    assert.ok(path.intro.length > 200);
    assert.equal(path.questions.length, 3);
    for (const number of path.numbers) assert.ok(currentChapters.some(c => c.number === number));
  }
});
test('edition metadata and citation files retain editor rather than author credit', () => {
  for (const [key, edition] of Object.entries(editions)) {
    const digits = [...edition.isbn].map(Number);
    const sum = digits.slice(0, 12).reduce((n, d, i) => n + d * (i % 2 ? 3 : 1), 0);
    assert.equal((10 - sum % 10) % 10, digits[12]);
    assert.ok(bookCitation(key).includes(String(edition.year)));
    const stem = key === '2e' ? 'second-edition' : 'first-edition';
    const bib = bibtex(bookReference(key));
    const risText = ris(bookReference(key));
    assert.match(bib, /editor\s*=/);
    assert.ok(bib.includes(edition.isbn));
    assert.match(risText, /A2  - Scala/);
  }
});
