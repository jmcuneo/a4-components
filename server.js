
//from greenlock upgrades to https

const
    greenlock = require("greenlock-express"),
    proxy = require("http-proxy");

greenlock.init({
    packageRoot: __dirname,
    configDir: './greenlock.d',
    maintainerEmail: "nateguana@gmail.com",
    cluster: false
}).ready(httpsWorker);

function httpsWorker(glx) {
    // we need the raw https server
    var server = proxy.createProxyServer({ xfwd: true });

    // catches error events during proxying
    server.on("error", function (err, req, res) {
        console.error(err);
        res.statusCode = 500;
        res.end();
        return;
    });

    // servers a node app that proxies requests to a localhost
    glx.serveApp(function (req, res) {
        server.web(req, res, {
            target: "http://localhost:3000"
        });
    });
}