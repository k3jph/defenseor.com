// Progressive enhancement only: all publication records and links exist in HTML.
const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
for (const root of document.querySelectorAll('[data-filter]')) {
  const form = root.querySelector('form');
  const input = root.querySelector('input[type="search"]');
  const select = root.querySelector('select');
  const items = [...root.querySelectorAll('[data-search]')];
  const status = root.querySelector('[data-count]');
  const empty = root.querySelector('[data-empty]');
  const clear = root.querySelector('[data-clear]');
  const apply = (write = true) => {
    const words = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
    let count = 0;
    for (const item of items) {
      const partMatch = !select || !select.value || item.dataset.part === select.value;
      const matches = partMatch && words.every(word => normalize(item.dataset.search || '').includes(word));
      item.hidden = !matches;
      if (matches) count++;
    }
    status.textContent = `${count} ${root.dataset.noun || 'records'}${count === items.length ? '' : ` of ${items.length}`}`;
    empty.hidden = count !== 0;
    for (const group of root.querySelectorAll('[data-group]')) group.hidden = !group.querySelector('[data-search]:not([hidden])');
    if (write) {
      const url = new URL(location.href);
      if (input.value.trim()) url.searchParams.set('q', input.value.trim()); else url.searchParams.delete('q');
      if (select?.value) url.searchParams.set('part', select.value); else url.searchParams.delete('part');
      history.replaceState(null, '', url);
    }
  };
  const restore = () => {
    const params = new URLSearchParams(location.search);
    input.value = params.get('q') || '';
    if (select) select.value = [...select.options].some(o => o.value === params.get('part')) ? params.get('part') : '';
    apply(false);
  };
  form.addEventListener('submit', event => { event.preventDefault(); apply(); });
  input.addEventListener('input', () => apply());
  select?.addEventListener('change', () => apply());
  clear?.addEventListener('click', () => { input.value = ''; if (select) select.value = ''; apply(); input.focus(); });
  window.addEventListener('popstate', restore);
  restore();
}
for (const button of document.querySelectorAll('[data-print]')) button.addEventListener('click', () => window.print());
for (const button of document.querySelectorAll('[data-copy]')) button.addEventListener('click', async () => {
  const source = document.getElementById(button.dataset.copy);
  const message = button.parentElement.querySelector('[role="status"]');
  try {
    if (!source || !navigator.clipboard) throw new Error('Clipboard is unavailable');
    await navigator.clipboard.writeText(source.textContent.trim());
    message.textContent = 'Citation copied.';
  } catch {
    message.textContent = 'Select the citation above to copy it. Clipboard access is unavailable in this browser.';
  }
});
