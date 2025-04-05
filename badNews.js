const badNewsForm = document.getElementById("bad-news-form");
const badNewsThread = document.getElementById("bad-news-thread");
const submitBadNews = document.getElementById("submitBadNews");

let badNewsEntries = [];

submitBadNews.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = document.getElementById("badNewsText").value.trim();
  const imageInput = document.getElementById("badNewsImage");
  const imageFile = imageInput.files[0];

  if (!text) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    const imageData = imageFile ? event.target.result : null;

    const entry = {
      text,
      image: imageData,
      timestamp: new Date().toLocaleString()
    };

    badNewsEntries.unshift(entry);
    displayBadNews();
    submitBadNews.reset();
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  } else {
    const entry = {
      text,
      image: null,
      timestamp: new Date().toLocaleString()
    };

    badNewsEntries.unshift(entry);
    displayBadNews();
    submitBadNews.reset();
  }
});

function displayBadNews() {
  badNewsThread.innerHTML = "";

  badNewsEntries.forEach(entry => {
    const container = document.createElement("div");
    container.className = "news-item";

    const textPara = document.createElement("p");
    textPara.textContent = entry.text;

    const time = document.createElement("small");
    time.textContent = `Posted on: ${entry.timestamp}`;

    container.appendChild(textPara);
    if (entry.image) {
      const img = document.createElement("img");
      img.src = entry.image;
      img.alt = "Uploaded image";
      img.style.maxWidth = "100%";
      img.style.marginTop = "10px";
      container.appendChild(img);
    }
    container.appendChild(time);
    badNewsThread.appendChild(container);
  });
}
