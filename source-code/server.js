const https = require('https');
const fs = require('fs');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const SECRET_KEY = 'CyberSecurityProjectKey';

const USER = {
    username: 'admin',
    password: 'admin123'
};

app.post('/login', (req, res) => {
    const { username, password } = req.body || {};

    if (username === USER.username && password === USER.password) {
        const token = jwt.sign(
            {
                username: username,
                role: 'SOC-Admin'
            },
            SECRET_KEY,
            {
                expiresIn: '10m'
            }
        );

        return res.json({
            message: 'Authentication Successful',
            token: token
        });
    }

    return res.status(401).json({
        message: 'Invalid Credentials'
    });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({
            message: 'Token Missing'
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid or Tampered Token'
            });
        }

        req.user = user;
        next();
    });
}

app.get('/secure-data', authenticateToken, (req, res) => {
    res.json({
        message: 'Authorized Access Granted',
        user: req.user
    });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Secure HTTP + JWS Web App running on port 3000');
});

const options = {
    key:fs.readFileSync('/home/user/certs/key.pem'),
    cert: fs.readFileSync('/home/user/certs/cert.pem')
};

https.createServer(options, app).listen(3443, '0.0.0.0', () => {
    console.log('HTTPS Server running on port 3443');
});