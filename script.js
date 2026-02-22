const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 16);
});

const page = document.body.dataset.page;

if (page === 'articles') {
  const articles = [
    { title: 'The Ethics of Algorithmic Intuition', excerpt: 'Can machine prediction deepen human judgment, or does certainty collapse curiosity?', date: 'May 4, 2026', category: 'Technology' },
    { title: 'Progress and the Beauty of Limits', excerpt: 'Innovation may depend less on breaking constraints than understanding them.', date: 'April 27, 2026', category: 'Philosophy' },
    { title: 'Culture in the Age of Infinite Context', excerpt: 'Hyperconnectivity blurs boundaries and reshapes identity.', date: 'April 18, 2026', category: 'Culture' },
    { title: 'The Scientific Method as a Living Myth', excerpt: 'Science grows stronger through revision and doubt.', date: 'April 9, 2026', category: 'Science' },
    { title: 'AI as Public Infrastructure', excerpt: 'Who governs systems that quietly guide our social decisions?', date: 'March 29, 2026', category: 'Technology' },
    { title: 'Rituals in a Rational Era', excerpt: 'Even hyper-rational cultures continue to build symbols and rites.', date: 'March 11, 2026', category: 'Culture' },
    { title: 'Paradoxes of Consciousness', excerpt: 'Philosophy asks whether awareness can ever observe itself fully.', date: 'February 22, 2026', category: 'Philosophy' },
    { title: 'Ambiguity in Modern Physics', excerpt: 'Uncertainty is not a flaw but a defining feature of reality.', date: 'February 4, 2026', category: 'Science' }
  ];

  const grid = document.getElementById('articles-grid');
  const filters = document.querySelectorAll('.filter-btn');
  const prev = document.getElementById('prev-page');
  const next = document.getElementById('next-page');
  const indicator = document.getElementById('page-indicator');

  const itemsPerPage = 4;
  let currentCategory = 'All';
  let currentPage = 1;

  const getFiltered = () =>
    currentCategory === 'All' ? articles : articles.filter((item) => item.category === currentCategory);

  const render = () => {
    const filtered = getFiltered();
    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    currentPage = Math.min(currentPage, totalPages);

    const start = (currentPage - 1) * itemsPerPage;
    const pageItems = filtered.slice(start, start + itemsPerPage);

    grid.innerHTML = pageItems
      .map(
        (item) => `
          <article class="glass-card fade-up">
            <p class="meta">${item.category} · ${item.date}</p>
            <h3>${item.title}</h3>
            <p>${item.excerpt}</p>
            <a class="read-link" href="article.html">Read More</a>
          </article>
        `
      )
      .join('');

    indicator.textContent = `Page ${currentPage} of ${totalPages}`;
    prev.disabled = currentPage <= 1;
    next.disabled = currentPage >= totalPages;
  };

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      filters.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      currentCategory = button.dataset.category;
      currentPage = 1;
      render();
    });
  });

  prev.addEventListener('click', () => {
    currentPage -= 1;
    render();
  });

  next.addEventListener('click', () => {
    currentPage += 1;
    render();
  });

  render();
}

if (page === 'article') {
  const progress = document.getElementById('reading-progress');
  const article = document.getElementById('reading-content');

  const updateProgress = () => {
    if (!progress || !article) return;
    const total = article.offsetHeight - window.innerHeight + 120;
    const percent = Math.max(0, Math.min(100, (window.scrollY / total) * 100));
    progress.style.width = `${percent}%`;
  };

  updateProgress();
  window.addEventListener('scroll', updateProgress);
  window.addEventListener('resize', updateProgress);
}
