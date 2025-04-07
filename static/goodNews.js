async function fetchGoodNews() {
  try {
    const response = await fetch("/goodnews");
    const articles = await response.json();
    const newsDiv = document.getElementById("news");
    newsDiv.innerHTML = "";

    articles.forEach(article => {
      const container = document.createElement("div");
      container.className = "news-item";

      if (article.image) {
        const img = document.createElement("img");
        img.src = article.image;
        img.alt = "News image";
        img.className = "good-news-img";
        container.appendChild(img);
      }

      const title = document.createElement("h3");
      const link = document.createElement("a");
      link.href = article.link;
      link.textContent = article.title;
      link.target = "_blank";
      title.appendChild(link);
      container.appendChild(title);

      const desc = document.createElement("p");
      desc.textContent = article.description;
      container.appendChild(desc);

      const source = document.createElement("p");
      source.className = "source";
      source.textContent = `Source: ${article.source} (${article.site_position})`;
      container.appendChild(source);

      newsDiv.appendChild(container);
    });

  } catch (error) {
    console.error("Failed to fetch good news:", error);
    const newsDiv = document.getElementById("news");
    newsDiv.innerHTML = "<p>Failed to load good news. Try again later.</p>";
  }
}
