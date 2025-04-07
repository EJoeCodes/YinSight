from flask import Flask, render_template, jsonify
import feedparser
import random
import re
from bs4 import BeautifulSoup

app = Flask(__name__)

# Positive keywords to match
POSITIVE_KEYWORDS = [
    "hope", "joy", "happy", "happiness", "love", "smile", "cheer", "delight", "grateful", "gratitude", "heartwarming",
    "touching", "triumph", "winner", "succeed", "achievement", "breakthrough", "milestone", "overcome", "solve",
    "surpass", "help", "save", "donate", "volunteer", "uplift", "support", "kind", "give back", "inspire",
    "new beginning", "bright future", "turning point", "comeback", "reunited", "recovery", "positive change", "progress",
    "rewild", "bloom", "rescue", "thrive", "flourish"
]

# Trusted RSS feeds
NEWS_SOURCES = [
    {
        "name": "Sunny Skyz",
        "url": "https://www.sunnyskyz.com/rss",
        "position": "centrist"
    },
    {
        "name": "Good News Network",
        "url": "https://www.goodnewsnetwork.org/feed/",
        "position": "centrist"
    },
    {
        "name": "The Optimist Daily",
        "url": "https://www.optimistdaily.com/feed/",
        "position": "left-leaning"
    },
    {
        "name": "Positive News UK",
        "url": "https://www.positive.news/feed/",
        "position": "center-left"
    }
]

def clean_html_description(raw_html):
    soup = BeautifulSoup(raw_html, "html.parser")
    for tag in soup(["img", "a"]):
        tag.decompose()
    text = soup.get_text().strip()
    paragraphs = [p.strip() for p in text.split("\n") if p.strip()]
    return paragraphs[0] if paragraphs else text

def extract_image_url(raw_html):
    match = re.search(r'<img[^>]+src="([^"]+)"', raw_html)
    return match.group(1) if match else None

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/goodnews")
def fetch_good_news():
    print("🔍 Fetching good news...")
    all_articles = []

    for site in NEWS_SOURCES:
        print(f"📡 Checking: {site['name']} ({site['url']})")
        try:
            feed = feedparser.parse(site["url"])
            for entry in feed.entries:
                title = entry.get("title", "").lower()
                description = entry.get("description", "").lower()
                content_to_check = title + " " + description

                # Match if any keyword is found in title or description
                if not any(keyword in content_to_check for keyword in POSITIVE_KEYWORDS):
                    continue

                raw_description = entry.get("description", "")
                clean_description = clean_html_description(raw_description)
                image_url = extract_image_url(raw_description)

                article = {
                    "title": entry.get("title", "No Title"),
                    "link": entry.get("link", "#"),
                    "description": clean_description,
                    "image": image_url,
                    "source": site["name"],
                    "site_position": site["position"]
                }

                all_articles.append(article)
        except Exception as e:
            print(f"⚠️ Error fetching from {site['name']}: {e}")

    # Shuffle for variety
    random.shuffle(all_articles)

    # Fallback if no articles found
    if not all_articles:
        print("🚨 No good news found — using fallback.")
        return jsonify([
            {
                "title": "People All Over the World Are Sharing Kindness",
                "link": "https://www.goodnewsnetwork.org/",
                "description": "From acts of kindness to global recovery efforts, good news is happening every day.",
                "image": "https://www.goodnewsnetwork.org/wp-content/uploads/2023/03/kindness-stock-photo.jpg",
                "source": "Fallback",
                "site_position": "center"
            }
        ])

    return jsonify(all_articles[:5])  # Return top 5

if __name__ == "__main__":
    app.run(debug=True)