// Proxy contact form to EC2 backend (avoids mixed content: HTTPS page → HTTP API).
const BACKEND_URL = 'http://13.51.171.30:5000';

export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    const response = await fetch(`${BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body || {}),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => ({}));
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Contact proxy error:', err);
    const message = err.name === 'AbortError' ? 'Request timed out' : 'Request failed';
    res.status(500).json({ success: false, message });
  }
}
