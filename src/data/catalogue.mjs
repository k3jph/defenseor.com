import { publicationRecords } from './publication-records.mjs';
// Publication metadata is transcribed from the sources below. Reading prompts,
// topic tags, and pathways are companion-site editorial material, not abstracts.
export const title = 'Handbook of Military and Defense Operations Research';
export const publisher = 'Chapman & Hall/CRC';
export const sources = {
  second: 'https://www.routledge.com/Handbook-of-Military-and-Defense-Operations-Research/Scala-HowardII/p/book/9781032497488',
  first: 'https://www.drnataliescala.com/mdor-toc',
  firstPublisher: 'https://www.routledge.com/Handbook-of-Military-and-Defense-Operations-Research/Scala-HowardII/p/book/9781138607330',
  james: 'https://jameshoward.us/books/handbook-military-defense-operations-research/',
  natalie: 'https://www.drnataliescala.com/books',
};
export const editions = {
  '2e': { label: 'Second edition', year: 2024, doi: '10.1201/9781003396307', isbn: '9781032497488', cover: '/assets/covers/second-edition.jpg', source: sources.second, parts: ['Approaches', 'Applications', 'Soft Skills and Perspectives'] },
  '1e': { label: 'First edition', year: 2020, doi: '10.1201/9780429467219', isbn: '9781138607330', cover: '/assets/covers/first-edition.webp', source: sources.first, parts: ['Approaches', 'Soft Skills and Client Relations', 'Applications', 'Perspectives'] },
};
export const slugify = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const aliases = {
  'Lynette Arnhart': 'Lynette M.B. Arnhart',
  'Marvin King': 'Marvin L. King III',
  'Robert E. Hamm, Jr.': 'Robert E. Hamm Jr.',
  'Mark A. C. Timms': 'Mark A.C. Timms',
};
export const personSlug = name => slugify(aliases[name] || name);
const second = [
  [1, 'Modern Data Analytics for the Military Operations Researcher', ['Raymond R. Hill'], 0, ['Data analytics']],
  [2, 'Microsoft Excel: The Universal Tool of Analysis', ['Joseph M. Lindquist', 'Charles A. Sulewski'], 0, ['Data analytics', 'Spreadsheets']],
  [3, 'Multiattribute Decision Modeling in Defense Applications', ['Roger Chapman Burk'], 0, ['Decision analysis']],
  [4, 'Military Workforce Planning and Modeling', ['Nathaniel D. Bastian', 'Andrew O. Hall'], 0, ['Planning']],
  [5, 'Military Assessments', ['Lynette M.B. Arnhart', 'Marvin L. King III'], 0, ['Assessment']],
  [6, 'Threatcasting in a Military Setting', ['Natalie Vanatta', 'Brian David Johnson'], 0, ['Foresight']],
  [7, 'Analytical Modeling of Stochastic Systems', ['Roger Chapman Burk'], 0, ['Uncertainty', 'Modeling']],
  [8, 'Modern Methods for Characterization of Social Networks through Network Models', ['Christine M. Schubert Kabban', 'Fairul Mohd-Zaid', 'Richard F. Deckro'], 0, ['Networks', 'Modeling']],
  [9, 'Process Optimization through an 8-Step Structured Problem-Solving Method', ['David M. Bernacki', 'Robert E. Hamm Jr.', 'Hung-da Wan'], 0, ['Optimization', 'Problem solving']],
  [10, 'Simulation Optimization', ['Shane N. Hall', 'Brian M. Wade', 'Benjamin G. Thengvall'], 0, ['Simulation', 'Optimization']],
  [11, 'Analytical Test Planning for Defense Acquisitions', ['Darryl K. Ahner', 'Gina Sigler'], 0, ['Testing']],
  [12, 'Influence Diagrams for Risk Management in Military and Defense', ['Cameron A. MacKenzie'], 0, ['Risk', 'Decision analysis']],
  [13, 'Wavelet Methods for Time Series Forecasting', ['Jared Nystrom', 'Raymond R. Hill', 'Andrew Geyer', 'Joseph J. Pignatiello Jr.', 'Eric Chicken'], 0, ['Forecasting', 'Data analytics']],
  [14, 'Simulation Validation Literature Review', ['Matthew C. Ledwith', 'Raymond R. Hill', 'Lance E. Champagne', 'Edward D. White'], 0, ['Simulation', 'Validation']],
  [15, 'A Model for and Inventory of Cybersecurity Values: Metrics and Best Practices', ['Natalie M. Scala', 'Paul L. Goethals'], 1, ['Cybersecurity', 'Assessment']],
  [16, 'Applying Information Theory to Validate Commanders’ Critical Information Requirements', ['Mark A.C. Timms', 'David R. Mandel', 'Jonathan D. Nelson'], 1, ['Information', 'Validation']],
  [17, 'Modeling and Analysis of the Army’s Sustainable Readiness Model Scheduling Problem', ['Adria Markowski', 'Subhash Sarin'], 1, ['Planning', 'Scheduling']],
  [18, 'Applying High Performance Computing Analytics for Understanding Weather Impacts on Installations', ['Randy Buchanan', 'John Richards', 'Hyeyon Bastian', 'Brendon Hoch', 'Christina Rinaudo', 'Natalie Myers'], 1, ['Weather', 'Data analytics']],
  [19, 'Why Won’t They Use Our Model?', ['Wilson L. Price', 'Walt DeGrange'], 2, ['Model adoption']],
  [20, 'Lessons Learned from Military Fast Jet Life Support System Test Planning', ['Sarah Burke', 'Steven Thorsen'], 2, ['Testing', 'Practice']],
];
const first = [
  [1, 'Modern Data Analytics for the Military Operations Researcher', ['Raymond R. Hill'], 0, ['Data analytics']],
  [2, 'Microsoft Excel: The Universal Tool of Analysis', ['Joseph M. Lindquist', 'Charles A. Sulewski'], 0, ['Spreadsheets']],
  [3, 'Military Decision Analysis', ['Roger Chapman Burk'], 0, ['Decision analysis']],
  [4, 'Military Workforce Planning and Manpower Modeling', ['Nathaniel D. Bastian', 'Andrew O. Hall'], 0, ['Planning']],
  [5, 'Military Assessments', ['Lynette Arnhart', 'Marvin King'], 0, ['Assessment']],
  [6, 'Threatcasting in a Military Setting', ['Natalie Vanatta', 'Brian David Johnson'], 0, ['Foresight']],
  [7, 'Analytical Modeling of Stochastic Systems', ['Roger Chapman Burk'], 0, ['Uncertainty', 'Modeling']],
  [8, 'Modern Methods for Characterization of Social Networks Through Network Models', ['Christine M. Schubert Kabban', 'Fairul Mohd-Zaid', 'Richard F. Deckro'], 0, ['Networks']],
  [9, 'Process Optimization Through Structured Problem Solving', ['David M. Bernacki', 'Robert E. Hamm, Jr.', 'Hung-da Wan'], 0, ['Optimization']],
  [10, 'Simulation Optimization', ['Shane N. Hall', 'Brian M. Wade', 'Benjamin G. Thengvall'], 0, ['Simulation', 'Optimization']],
  [11, 'Analytical Test Planning for Defense Acquisitions', ['Darryl K. Ahner', 'Gina Sigler'], 0, ['Testing']],
  [12, 'Why Won’t They Use Our Model?', ['Walt DeGrange', 'Wilson L. Price'], 1, ['Model adoption']],
  [13, 'From BOGSAT to Turbo Teams', ['F. Freeman Marvin'], 1, ['Practice']],
  [14, 'A Model for and Inventory of Cybersecurity Values: Metrics and Best Practices', ['Natalie M. Scala', 'Paul L. Goethals'], 2, ['Cybersecurity']],
  [15, 'Applying Information Theory to Validate Commanders’ Critical Information Requirements', ['Mark A. C. Timms', 'David R. Mandel', 'Jonathan D. Nelson'], 2, ['Information']],
  [16, 'Modeling and Inferencing of Activity Profiles of Terrorist Groups', ['Vasanthan Raghavan'], 2, ['Modeling']],
  [17, 'Expert COSYSMO Systems Engineering Cost Model and Risk Advisor', ['Raymond Madachy', 'Ricardo Valerdi'], 2, ['Risk']],
  [18, 'How Data Science Happens', ['James P. Howard, II'], 3, ['Data analytics', 'Practice']],
  [19, 'Modernizing Military Operations Research Education', ['Chris Arney', 'Michael Yankovich', 'Krista Watts'], 3, ['Education']],
  [20, 'Strategic Analytics and the Future of Military Operations Research', ['Greg H. Parlier'], 3, ['Foresight']],
];
const make = (rows, edition) => rows.map(([number, name, authors, part, topics]) => ({
  number, title: name, authors, part, topics, edition,
  id: `${edition}-${String(number).padStart(2, '0')}`,
  slug: slugify(name),
  url: `/chapters/${edition}/${slugify(name)}/`,
}));
// Keep the original routes stable when a deposited chapter title differs from a catalogue title.
export const chapters = [...make(second, '2e'), ...make(first, '1e')].map(c => ({
  ...c, catalogueTitle: c.title, ...publicationRecords[c.id],
  depositedTitle: publicationRecords[c.id].title,
  // These published contents/proof subtitles are omitted from the deposit.
  title: ['2e-02', '2e-15'].includes(c.id) ? c.title : publicationRecords[c.id].title,
}));
export const catalogueUrl = edition => edition === '1e' ? '/chapters/1e/' : '/chapters/';
export const currentChapters = chapters.filter(c => c.edition === '2e');
export const editors = [
  { name: 'Natalie M. Scala', display: 'Natalie Scala', url: 'https://www.drnataliescala.com/', image: '/assets/identity/natalie-scala-192.webp' },
  { name: 'James P. Howard, II', display: 'James Howard', url: 'https://jameshoward.us/', image: '/assets/identity/jh-badge-1x1.svg' },
];
const people = new Map();
for (const c of chapters) for (const byline of c.authors) {
  const name = aliases[byline] || byline;
  const slug = personSlug(name);
  if (!people.has(slug)) people.set(slug, { name, slug, chapters: [], editor: editors.find(e => e.name === name) });
  people.get(slug).chapters.push(c);
}
export const contributors = [...people.values()].sort((a, b) => {
  const sortName = n => n.replace(/,? (II|III|Jr\.)$/, '').split(' ').slice(-1)[0];
  return sortName(a.name).localeCompare(sortName(b.name)) || a.name.localeCompare(b.name);
});
export const currentContributors = contributors.filter(p => p.chapters.some(c => c.edition === '2e'));
export const partNotes = [
  'Begin with the analytical tools: data, decisions, models, optimization, forecasting, and the evidence needed to test them.',
  'Follow the methods into particular settings, from cybersecurity values and information requirements to readiness and weather.',
  'Return to the people doing the work: getting a model used and learning from the experience of planning a test.',
];
export const pathways = [
  {
    slug: 'from-data-to-a-model', title: 'From data to a defensible model', label: 'Data · Forecasting · Validation', numbers: [1, 2, 13, 14],
    intro: 'A result can be computed correctly and still answer the wrong question. This reading sequence brings together data analytics, a familiar working tool, forecasting, and simulation validation. Read with one distinction in mind: reproducing a calculation tells us whether we can obtain the result again; deciding whether to use that result requires evidence about the problem it represents. Keep a record of the assumptions you encounter, who would have to accept them, and what observation would make you reconsider them.',
    questions: ['What decision is the proposed analysis supposed to inform? State it before choosing a method.', 'Which assumptions come from the data, and which have been introduced by the analyst?', 'What evidence would support using the result outside the conditions under which it was produced?'],
    exercise: 'Choose an ordinary forecasting problem, such as demand for a campus service. Write a one-page plan identifying the available data, the quantity to predict, and a way to assess a forecast against observations that were not used to construct it. Do not calculate a forecast yet. Exchange plans with another reader and identify one assumption that would need testing before the proposed forecast could support a decision.',
  },
  {
    slug: 'structuring-a-decision', title: 'Structuring a decision under uncertainty', label: 'Decisions · Uncertainty · Model use', numbers: [3, 7, 12, 19],
    intro: 'A decision begins with alternatives, but it also needs someone who can choose among them and a reason to prefer one outcome to another. This sequence places decision modeling alongside stochastic systems, risk management, and model use. The chapters retain their own purposes; the reading exercise is to ask how the same practical decision looks through each of these lenses. Separate disagreement about what will happen from disagreement about what matters. More data might address the first disagreement without settling the second.',
    questions: ['Who makes the decision, and which alternatives are actually available to that person?', 'Where are probabilities being used, and where are preferences or priorities being expressed?', 'What would a decision maker need to understand before acting on the model?'],
    exercise: 'Consider choosing a venue for a professional workshop. Identify three alternatives, three relevant objectives, and two uncertain conditions. Separate the information you could collect from the preferences the organizer must supply. Write down which change would cause you to reconsider your initial choice. The exercise concerns the structure of the decision, not the production of a universal ranking of venues.',
  },
  {
    slug: 'planning-testing-and-use', title: 'Connecting plans, tests, and practice', label: 'Planning · Assessment · Testing', numbers: [4, 5, 11, 17, 20],
    intro: 'A plan is a claim about what can be done with the people, time, and resources available. A test asks a more specific question about what happens under particular conditions. This sequence brings planning and assessment into conversation with analytical test planning and an account of practical testing experience. As you read, keep those different purposes visible. A schedule that satisfies its stated constraints has passed one check; whether those constraints represent the setting is a separate question requiring separate evidence.',
    questions: ['Which constraints are physical limits, which are organizational rules, and which are assumptions?', 'What observation would show that the plan or model needs to change?', 'Does the proposed test address the decision at hand, or only a quantity that is easy to measure?'],
    exercise: 'Use the schedule for a small training workshop. List the people, rooms, equipment, and preparation time it requires. Identify one assumption that could make an apparently feasible schedule fail. Design a small check of that assumption and explain what you would change if the check failed. Keep the example civilian and self-contained; no operational data are needed.',
  },
];
export const chapterPathways = c => c.edition === '2e' ? pathways.filter(p => p.numbers.includes(c.number)) : [];
export const bookCitation = edition => `Scala, N. M., & Howard, J. P., II (Eds.). (${editions[edition].year}). ${title}${edition === '2e' ? ' (2nd ed.)' : ''}. ${publisher}.`;
