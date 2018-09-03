var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var jwt = require('jwt-simple');
var jwtDecode = require('jwt-decode');
var moment = require('moment');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Access-Token");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var crypToken = 'thebinarygod'

var port = process.env.PORT || 3000;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function (err) {
    if (err) throw err;
    console.log("MySQL > Connected!");
    con.query("use dagobit;", function (err, result, fields) {
        if (err) throw err;
    });
});

app.post('/auth', function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token);
    if (token) {
        try {
            var decoded = jwt.decode(token, crypToken);
            console.log('Decodando ' + JSON.stringify(decoded));
            console.log(Date.now());
            if (decoded.exp <= Date.now()) {
                console.log('Auth: False (Acesso Expirado, faça login novamente)');
                return res.json(400, { error: 'Acesso Expirado, faça login novamente' });
            } else {
                console.log('Auth: True');
                return res.status(200).send({ auth: true, access_token: req.body.access_token });
            }
        } catch (err) {
            console.log(err);
            console.log('Auth: False (Seu token é inválido)');
            return res.status(401).json({ error: 'Seu token é inválido' });
        }
    } else {
        console.log('Auth: False (Token não encontrado ou informado)');
        res.json(401, { error: 'Token não encontrado ou informado' })
    }

});

app.post('/user', function (req, res) {
    console.log("MySQL [" + req.connection.remoteAddress + "]");
    console.log(req.body);
    con.query("SELECT id, name, nick, age FROM users WHERE mail='" + req.body.username + "' OR nick='" + req.body.username + "' AND pass='" + req.body.password + "'",
        function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            if (result.length != 0) {
                var expires = moment().add(7, 'days').valueOf();
                var token = jwt.encode({
                    iss: result[0].id,
                    exp: expires
                }, crypToken);
            }
            res.json({ data: result[0], access_token: token });
        });
});

app.post('/getfeed', function (req, res) {
    console.log("MySQL [" + req.connection.remoteAddress + "]");
    console.log(req.body);
    con.query(
        `
        SELECT 
            users.nick, 
            users.profile,
            post.content, 
            post.description,
            post.nice,
            post.comment,
            post.type, 
            post.audienceId, 
            post.createDate, 
            post.updateDate
        FROM 
            post 
        LEFT JOIN users ON post.userId=users.id
            
        `,
        function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json({ feed: result });
        });
});

app.post('/getprofile', function (req, res) {
    console.log("MySQL [" + req.connection.remoteAddress + "]");
    console.log(req.body);
    var results = {};
    con.query(
        `SELECT 
            post.content, 
            post.description,
            post.nice,
            post.comment,
            post.type, 
            post.audienceId, 
            post.createDate, 
            post.updateDate
        FROM 
            post 
        LEFT JOIN users ON post.userId=users.id WHERE users.nick='`+ req.body.nick + `' AND post.type = 1`,
        function (err, contents, fields) {
            if (err) throw err;
            results.contents = contents;
            con.query(
                `SELECT users.id, users.name, users.nick, users.followers, users.following, users.profile FROM users WHERE users.nick='` + req.body.nick + `'`,
                function (err, userinfo, fields) {
                    if (err) throw err;
                    results.userinfo = userinfo;
                    con.query(
                        `SELECT typeId FROM network WHERE personId = ` + req.body.id + ` AND friendId = (SELECT users.id FROM users WHERE users.nick='` + req.body.nick + `')`,
                        function (err, network, fields) {
                            if (err) throw err;
                            results.network = network;
                            res.json({ profile: results.userinfo, contents: results.contents, network: results.network });
                        });
                });
        });
});

app.listen(port);
console.log('Server started (' + port + ')');