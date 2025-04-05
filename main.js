const newsData = {
    good: [
      "Local community raises thousands for shelter animals.",
      "Scientists discover breakthrough in clean energy.",
      "Graduation rates hit all-time high nationwide."
    ],
    bad: [] // user generated bad news
  };

  let currentRotation = 0;
  let currentMode = 'good';

  function showNews(type) {
    currentMode = type;

    const newsDiv = document.getElementById('news');
    const body = document.getElementById('main-body');
    const yinYang = document.getElementById('yinYang');

    newsDiv.style.display = 'block';
    newsDiv.innerHTML = '';

    yinYang.src = "images/yinspun.png";

    const targetRotation = (type === 'good') ? 0 : 180;
    currentRotation += 720 + targetRotation;
    yinYang.style.transform = `rotate(${currentRotation}deg)`;

    if (type === 'good') {
      body.classList.add('yang-theme');
      body.classList.remove('yin-theme');

      getPositiveNews(); // Comes from goodNews.js
    } else {
      body.classList.add('yin-theme');
      body.classList.remove('yang-theme');

      // Load the form and submitted posts
      loadBadNewsForm(newsDiv);
      loadBadNewsPosts(newsDiv);
    }
  }

  function toggleYinYang() {
    const nextMode = (currentMode === 'good') ? 'bad' : 'good';
    showNews(nextMode);
  }

  window.onload = () => {
    document.getElementById('yinYang').addEventListener('click', toggleYinYang);
  };

  // ✅ BAD NEWS FORM + POSTS
  function loadBadNewsForm(container) {
    const form = document.createElement('form');
    form.id = 'bad-news-form';
    form.innerHTML = `
      <textarea id="bad-news-text" placeholder="What's on your mind?" required></textarea>
      <input type="file" id="bad-news-image" accept="image/*" />
      <button type="submit">Submit Bad News</button>
    `;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const text = document.getElementById('bad-news-text').value;
      const fileInput = document.getElementById('bad-news-image');
      const file = fileInput.files[0];

      const reader = new FileReader();

      reader.onload = function () {
        const newPost = {
          text,
          image: file ? reader.result : null,
          timestamp: new Date().toLocaleString()
        };
        newsData.bad.unshift(newPost); // Add to the beginning
        showNews('bad'); // Re-render
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        reader.onload(); // Just post without an image
      }

      form.reset();
    });

    container.appendChild(form);
  }

  function loadBadNewsPosts(container) {
    const thread = document.createElement('div');
    thread.id = 'bad-news-thread';

    newsData.bad.forEach(post => {
      const div = document.createElement('div');
      div.className = 'bad-news-post';

      const content = document.createElement('p');
      content.textContent = post.text;
      div.appendChild(content);

      if (post.image) {
        const img = document.createElement('img');
        img.src = post.image;
        img.alt = 'User uploaded image';
        div.appendChild(img);
      }

      const time = document.createElement('small');
      time.textContent = post.timestamp;
      div.appendChild(time);

      thread.appendChild(div);
    });

    container.appendChild(thread);
  }