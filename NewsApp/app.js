document.addEventListener("DOMContentLoaded", () => {
    const apiKey = 'a2cb344c9dea4cbf96be380259a5fc82';
    const blogContainer = document.getElementById("blog-container");
    const searchButton = document.getElementById("search-button");
    const searchField = document.getElementById("search-input");

    async function fetchRandomNews() {
        try {
            const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=${apiKey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log("Random news fetched:", data);
            return data.articles;
        } catch (error) {
            console.error("Error fetching random news", error);
            return [];
        }
    }

    function displayBlogs(articles) {
        blogContainer.innerHTML = "";
        articles.forEach((article) => {
            const blogCard = document.createElement("div");
            blogCard.classList.add("blog-card");

            const img = document.createElement("img");
            img.loading = "lazy"; // Enable lazy loading
            if (article.urlToImage) {
                img.src = article.urlToImage;
                img.alt = article.title;
            } else {
                img.src = 'https://placehold.co/600x400';
                img.alt = 'Placeholder image';
            }

            const title = document.createElement("h2");
            title.textContent = article.title;

            const description = document.createElement("p");
            description.textContent = article.description;

            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);
            blogCard.addEventListener("click", () => {
                window.open(article.url, "_blank");
            });
            blogContainer.appendChild(blogCard);
        });
    }

    async function fetchNewsQuery(query) {
        try {
            const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log("News fetched for query:", query, data);
            return data.articles;
        } catch (error) {
            console.error("Error fetching news by query", error);
            return [];
        }
    }

    searchButton.addEventListener("click", async () => {
        const query = searchField.value.trim();
        if (query !== "") {
            try {
                const articles = await fetchNewsQuery(query);
                displayBlogs(articles);
            } catch (error) {
                console.log("Error fetching news by query", error);
            }
        }
    });

    (async () => {
        try {
            const articles = await fetchRandomNews();
            displayBlogs(articles);
        } catch (error) {
            console.error("Error fetching random news", error);
        }
    })();
});
