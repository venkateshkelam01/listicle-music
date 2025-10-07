const fs = require('fs');
const path = require('path');

function render(filePath, data = {}) {
    let html = fs.readFileSync(filePath, 'utf8');
    for (const [k, v] of Object.entries(data)) {
        html = html.replace(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), v ?? '');
    }
    return html;
}

function withLayout({ title, description = '', body, pageStyles = '' }) {
    const layoutPath = path.join(__dirname, '../../views/layout.html');
    return render(layoutPath, { title, description, body, pageStyles });
}

function notFoundHandler(req, res) {
    const body = `<section style="text-align:center"><img src="/404.svg" alt="Not found"><p><a href="/" class="btn-elevated">Go home</a></p></section>`;
    const html = withLayout({ title: 'Not found', description: '', body });
    res.status(404).send(html);
}

function errorHandler(err, _req, res, _next) {
    console.error(err);
    res.status(500).send('<pre>Server error. Check logs.</pre>');
}

module.exports = { render, withLayout, notFoundHandler, errorHandler };
