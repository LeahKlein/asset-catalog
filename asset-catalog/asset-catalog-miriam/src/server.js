var http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('A new asset has been received');
});

server.listen(5000, () => { console.log(`Server running at http://localhost:${PORT}/`); });
