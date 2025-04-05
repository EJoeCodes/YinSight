const positiveKeywords = [
    "uplifting", "celebrates", "hope", "joy", "inspiring", "successful", "revival", 
    "saves", "rescue", "achievement", "award", "innovation", "progress", "breakthrough"
  ];
  
  // Mock good news articles (replace with API later)
  const mockGoodNewsArticles = [
    {
      title: "New Coral Reef Discovered Thriving in Protected Waters",
      url: "https://www.example.com/coral-reef-thriving",
      image: "https://via.placeholder.com/600x300?text=Coral+Reef",
      summary: "Marine biologists have found a flourishing coral reef ecosystem in a newly protected area off the coast, offering hope for ocean conservation efforts."
    },
    {
      title: "High Schooler Invents Low-Cost Water Purifier",
      url: "https://www.example.com/teen-invents-purifier",
      image: "https://via.placeholder.com/600x300?text=Water+Purifier",
      summary: "A 16-year-old student has created a simple yet effective water purification system to help remote communities access clean drinking water."
    },
    {
      title: "Neighborhood Unites to Build Free Pantry System",
      url: "https://www.example.com/community-pantry",
      image: "https://via.placeholder.com/600x300?text=Community+Pantry",
      summary: "Residents came together to install free food pantries across their city, ensuring no family goes hungry."
    }
  ];
  
  // This function renders the good news articles to the page
  function getPositiveNews() {
    const newsDiv = document.getElementById('news');
    newsDiv.innerHTML = ''; // Clear old content
  
    mockGoodNewsArticles.forEach(article => {
      const articleDiv = document.createElement('div');
      articleDiv.className = 'news-item';
  
      const img = document.createElement('img');
      img.src = article.image;
      img.alt = article.title;
      img.style.maxWidth = '100%';
      img.style.borderRadius = '10px';
  
      const link = document.createElement('a');
      link.href = article.url;
      link.target = '_blank';
      link.textContent = article.title;
      link.style.display = 'block';
      link.style.fontWeight = 'bold';
      link.style.fontSize = '18px';
      link.style.margin = '10px 0';
  
      const summary = document.createElement('p');
      summary.textContent = article.summary;
  
      articleDiv.appendChild(img);
      articleDiv.appendChild(link);
      articleDiv.appendChild(summary);
  
      newsDiv.appendChild(articleDiv);
    });
  }