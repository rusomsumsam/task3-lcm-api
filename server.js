const http = require('http');

function isNatural(n) {
    return /^[1-9]\d*$/.test(n);
}

function gcd(a, b) { 
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

function lcm(a, b) {
    return (a * b) / gcd(a, b);
};

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const x = url.searchParams.get('x');
    const y = url.searchParams.get('y');
    
    res.writeHead(200, { "content-type": "text/plain" });
    if (path == '/sbintemostofa_gmail_com') {
        if (!isNatural(x) || !isNatural(y)) {
            res.end('NaN');
        } else {
            const a = Number(x);
            const b = Number(y);
            res.end(String(lcm(a, b)));
        }
    } else {
        res.end('NaN');
    }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});