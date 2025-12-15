/**
 * Simple Express server to serve static files for Heroku deployment
 * Supports custom domain siso.delivery with HTTPS
 * Multi-language support: Hebrew (default), Arabic, English
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy (important for Heroku and HTTPS)
app.set('trust proxy', 1);

// Redirect www to non-www (canonical domain)
app.use((req, res, next) => {
    if (req.hostname === 'www.siso.delivery') {
        return res.redirect(301, `https://siso.delivery${req.url}`);
    }
    next();
});

// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`);
        } else {
            next();
        }
    });
}

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Language routing
// Arabic version
app.get('/ar', (req, res) => {
    res.sendFile(path.join(__dirname, 'index-ar.html'));
});

// English version
app.get('/en', (req, res) => {
    res.sendFile(path.join(__dirname, 'index-en.html'));
});

// Default Hebrew version
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Available languages: Hebrew (/), Arabic (/ar), English (/en)`);
});

