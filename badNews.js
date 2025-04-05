document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('badNewsSubmitForm');
    const thread = document.getElementById('userBadNewsThread');
    const newsDiv = document.getElementById('news');
    const badForm = document.getElementById('bad-news-form');
  
    window.showNews = function(type) {
      newsDiv.style.display = 'block';
      badForm.style.display = (type === 'bad') ? 'block' : 'none';
      newsDiv.innerHTML = '';
  
      if (type === 'bad') {
        // Hide default news (or could display both user + preset)
        document.body.classList.remove('yang-theme');
      } else {
        document.body.classList.add('yang-theme');
        const goodNews = [
          "Local community raises thousands for shelter animals.",
          "Scientists discover breakthrough in clean energy.",
          "Graduation rates hit all-time high nationwide."
        ];
        goodNews.forEach(item => {
          const div = document.createElement('div');
          div.className = 'news-item';
          div.textContent = item;
          newsDiv.appendChild(div);
        });
      }
    };
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const text = document.getElementById('badNewsText').value;
      const imageInput = document.getElementById('badNewsImage');
      const file = imageInput.files[0];
  
      const storyDiv = document.createElement('div');
      storyDiv.className = 'news-item';
      storyDiv.innerHTML = `<p>${text}</p>`;
  
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const img = document.createElement('img');
          img.src = event.target.result;
          img.style.maxWidth = '200px';
          img.style.borderRadius = '10px';
          img.style.marginTop = '10px';
          storyDiv.appendChild(img);
          thread.prepend(storyDiv);
        };
        reader.readAsDataURL(file);
      } else {
        thread.prepend(storyDiv);
      }
  
      // Reset form
      form.reset();
    });
  });
  