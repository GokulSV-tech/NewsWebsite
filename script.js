const API_KEY = "5f5866500a1f4dc4a9d4ede238ee653b";
const url = "https://newsapi.org/v2/everything?q=";

async function fetchData(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        alert("Failed to load news. Please try again later.");
        return { articles: [] };
    }
}

fetchData("all").then(data => renderMain(data.articles));

const mobileMenu = document.querySelector(".mobile");
const menuBtn = document.querySelector(".menuBtn");
menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

function renderMain(arr) {
    if (arr.length === 0) {
        document.querySelector("main").innerHTML = "<p>No articles found. Try a different search term.</p>";
        return;
    }

    let mainHTML = '';
    arr.forEach(article => {
        if (article.urlToImage) {
            mainHTML += `
                <div class="card">
                    <a href="${article.url}" target="_blank">
                        <img src="${article.urlToImage}" loading="lazy" />
                        <h4>${article.title}</h4>
                        <div class="publishbyDate">
                            <p>${article.source.name}</p>
                            <span>•</span>
                            <p>${new Date(article.publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">
                            ${article.description}
                        </div>
                    </a>
                </div>`;
        }
    });
    document.querySelector("main").innerHTML = mainHTML;
}

const searchForm = document.getElementById("searchForm");
const searchFormMobile = document.getElementById("searchFormMobile");
const searchInput = document.getElementById("searchInput");
const searchInputMobile = document.getElementById("searchInputMobile");

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData(searchInput.value);
    renderMain(data.articles);
});

searchFormMobile.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData(searchInputMobile.value);
    renderMain(data.articles);
});

async function Search(query) {
    const data = await fetchData(query);
    renderMain(data.articles);
}
