const http = require('http');

function isNatural(n) {
    return /^[1-9]\d*$/.test(n);
}

function gcd(a, b) {
    while (b !== 0n) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    return (a / gcd(a, b)) * b;
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const x = url.searchParams.get('x');
    const y = url.searchParams.get('y');

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (path === '/sbintemostofa_gmail_com') {
        if (!isNatural(x) || !isNatural(y)) {
            res.end('NaN');
        } else {
            const a = BigInt(x);
            const b = BigInt(y);
            res.end(lcm(a, b).toString());
        }
    } else {
        res.end('NaN');
    }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});