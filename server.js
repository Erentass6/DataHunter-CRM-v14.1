const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const mongoose = require('mongoose');
const cors = require('cors');

puppeteer.use(StealthPlugin());
const app = express();
app.use(express.json());
app.use(cors());

const MONGODB_URL = "mongodb+srv://eren:emlakci123@cluster0.vzfztfr.mongodb.net/emlak_database?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGODB_URL).then(() => console.log("✅ VERİ MERKEZİ BAĞLANDI!")).catch(err => console.log("❌ DB HATASI:", err));

const Emlakci = mongoose.model('Emlakci', {
    name: String, link: { type: String, unique: true }, phone: String, address: String,
    city: String, district: String, rating: Number, reviews: Number,
    note: { type: String, default: "" }, date: { type: Date, default: Date.now }
});

const sehirler = [
    "İstanbul Kadıköy", "İstanbul Beşiktaş", "İstanbul Şişli", "İstanbul Üsküdar", "İstanbul Esenyurt",
    "Ankara Çankaya", "Ankara Yenimahalle", "Ankara Mamak",
    "İzmir Konak", "İzmir Karşıyaka", "İzmir Bornova",
    "Bursa Nilüfer", "Antalya Muratpaşa", "Samsun Atakum", "Çorum Merkez", "Adana Seyhan"
];
let aktifSira = 0;

async function googleMapsAvci() {
    const aramaTerimi = sehirler[aktifSira];
    const parcalar = aramaTerimi.split(' ');
    const anaSehir = parcalar[0];
    const ilce = parcalar.slice(1).join(' '); 

    console.log(`📡 [TARAMA BAŞLADI] Bölge: ${anaSehir} / ${ilce}`);

    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,1000'] });
    const page = await browser.newPage();
    try {
        await page.goto(`https://www.google.com/maps/search/${aramaTerimi}+emlakçılar/`, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 5000));

        for (let i = 0; i < 20; i++) {
            await page.mouse.move(300, 500);
            await page.mouse.wheel({ deltaY: 2500 });
            await new Promise(r => setTimeout(r, 1200));
        }

        const data = await page.evaluate(() => {
            const results = [];
            document.querySelectorAll('div[role="article"]').forEach(el => {
                const name = el.querySelector('div.fontHeadlineSmall')?.innerText;
                const link = el.querySelector('a')?.href;
                const infoText = el.innerText;
                
                let rating = 0; let reviews = 0;
                const rLabel = el.querySelector('span[aria-label*="yıldız"], span[aria-label*="stars"]')?.getAttribute('aria-label');
                if (rLabel) {
                    const rMatch = rLabel.match(/(\d[,.]\d)/);
                    if (rMatch) rating = parseFloat(rMatch[0].replace(',', '.'));
                    const revMatch = rLabel.match(/(\d+)\s+(?:yorum|reviews|değerlendirme)/) || infoText.match(/\((\d+)\)/);
                    if (revMatch) reviews = parseInt(revMatch[1]);
                }
                const phone = infoText.match(/(?:\+90|0)?\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}/g);
                if (name && link) results.push({ name, link, phone: phone ? phone[0] : 'Yok', rating, reviews });
            });
            return results;
        });

        for (let item of data) {
            try {
                await Emlakci.updateOne({ link: item.link }, 
                { $set: { name: item.name, phone: item.phone, city: anaSehir, district: ilce, rating: item.rating, reviews: item.reviews }}, 
                { upsert: true });
            } catch (e) {}
        }
        console.log(`✅ ${aramaTerimi} Bitti. Veritabanı güncellendi.`);
    } catch (e) { console.log("❌ Hata:", e.message); }

    await browser.close();
    aktifSira = (aktifSira + 1) % sehirler.length;
    setTimeout(googleMapsAvci, 60000); 
}
googleMapsAvci();

app.get('/api/all', async (req, res) => res.json(await Emlakci.find().sort({ date: -1 })));
app.post('/api/note', async (req, res) => {
    const { id, note } = req.body;
    await Emlakci.findByIdAndUpdate(id, { note });
    res.json({ success: true });
});
app.listen(3000, () => console.log('🚀 API AKTİF!'));