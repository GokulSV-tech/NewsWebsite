const apiKey = '5f5866500a1f4dc4a9d4ede238ee653b'; 
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const refreshBtn = document.getElementById('refresh-btn');

async function fetchNews(query = '') {
  const endpoint = query
    ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=20&language=en&sortBy=publishedAt&apiKey=${apiKey}`
    : `https://newsapi.org/v2/everything?q=India&pageSize=20&language=en&sortBy=publishedAt&apiKey=${apiKey}`;
  try {
    const resp = await fetch(endpoint);
    if (!resp.ok) throw new Error('Network error');
    const data = await resp.json();
    return data.articles;
  } catch (err) {
    console.error(err);
    return [];
  }
}

function renderArticles(articles) {
  newsContainer.innerHTML = '';
  if (!articles.length) {
    newsContainer.innerHTML = '<p>No articles found.</p>';
    return;
  }
  articles.forEach(article => {
    if (!article.title || !article.url) return;
    const div = document.createElement('div');
    div.className = 'article';
    div.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}" alt=""/>
      <div class="article-content">
        <h2>${article.title}</h2>
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      </div>
    `;
    newsContainer.appendChild(div);
  });
}

async function init() {
  newsContainer.innerHTML = '<p>Loading...</p>';
  const articles = await fetchNews();
  renderArticles(articles);
}

searchBtn.addEventListener('click', async () => {
  const q = searchInput.value.trim();
  if (!q) return;
  newsContainer.innerHTML = '<p>Searching...</p>';
  const articles = await fetchNews(q);
  renderArticles(articles);
});

searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchBtn.click();
});

refreshBtn.addEventListener('click', init);

window.addEventListener('load', init);
