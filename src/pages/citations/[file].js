import { citationEntries, bibtex, ris } from '../../data/citations.mjs';
export function getStaticPaths() {
  return citationEntries.flatMap(entry => ['bib', 'ris'].map(format => ({ params: { file: `${entry.id}.${format}` }, props: { entry, format } })));
}
export function GET({ props: { entry, format } }) {
  return new Response(format === 'bib' ? bibtex(entry) : ris(entry), { headers: {
    'Content-Type': format === 'bib' ? 'application/x-bibtex; charset=utf-8' : 'application/x-research-info-systems; charset=utf-8',
    'Content-Disposition': `attachment; filename="${entry.id}.${format}"`,
  } });
}
