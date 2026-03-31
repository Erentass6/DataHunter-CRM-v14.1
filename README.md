# 🏢 DataHunter CRM v14.1 - Real Estate Intelligence & Lead Generation

**DataHunter CRM** is a professional automation platform designed to extract, analyze, and manage real estate business data directly from Google Maps. Developed by **Difference Agency (Serhat Ezibay & Eren Taş)**.

---

## 🚀 Key Features
* **Deep Scraping:** Puppeteer-based engine to bypass anti-bot systems and crawl specific districts (e.g., Beşiktaş, Çankaya).
* **Weighted Scoring Algorithm:** Ranks businesses using a custom formula: `(Rating * 0.7) + (log10(Reviews + 1) * 1.5)`.
* **Integrated CRM Dashboard:** Features real-time note-taking, one-click WhatsApp integration, and hierarchical filtering (City/District).
* **High Performance:** Optimized to handle 3000+ data entries without browser lag using virtual rendering.

---

## 🛠️ Installation & Usage

1.  **Install Dependencies:**
    Open your terminal in the project directory and run:
    `npm install`

2.  **Start the System:**
    To launch the backend API and the scraper bot:
    `node server.js`

3.  **Open the Dashboard:**
    Simply open the `index.html` file in your preferred browser (Chrome/Edge).

---

## 🏗️ Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB & Mongoose (Cloud Cluster)
* **Automation:** Puppeteer Stealth (Anti-Bot)
* **Frontend:** Tailwind CSS, JavaScript (ES6+)

---
**Developers:** Serhat Ezibay & Eren Taş
*A Difference Agency Production.*
