/**
 * One-time script: downloads hero and feature images to public/images.
 * Run: node scripts/download-images.js
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'images');

const images = [
  {
    url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80',
    file: 'hero-main.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/4389465/pexels-photo-4389465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    file: 'hero-secondary.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=1200&q=80',
    file: 'hero-about.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80',
    file: 'feature-collaboration.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1680459575585-390ed5cfcae0?w=800&q=80',
    file: 'feature-teamwork.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?w=800&q=80',
    file: 'feature-analytics.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    file: 'feature-performance.jpg'
  }
];

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function download(url, filePath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filePath);
    protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(filePath);
        return download(res.headers.location, filePath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(filePath, () => {}); reject(err); });
  });
}

(async () => {
  for (const { url, file } of images) {
    const filePath = path.join(OUT_DIR, file);
    try {
      await download(url, filePath);
      console.log('OK', file);
    } catch (e) {
      console.error('FAIL', file, e.message);
    }
  }
})();
