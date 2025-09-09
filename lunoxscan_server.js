const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('./config/db');
const path = require('path');
const app = express();
const flash = require('express-flash');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 essais max
    message: 'Trop de tentatives, réessayez plus tard.'
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'lunox_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60
    }
}));
app.use(flash());

// ROUTES
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Register
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'user', 'register.html')));
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword], (err) => {
            if (err) return res.send('Erreur: ' + err);
            res.redirect('/');
        });
});

// Login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'user', 'login.html'));
});

app.post('/login', loginLimiter,(req, res) => {
    const { identifier, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ? OR username = ?', [identifier, identifier], async (err, results) => {
        if (err) return res.flash('error', 'Erreur');
        if (results.length === 0) return res.flash('error', 'Utilisateur non trouvé');

        const valid = await bcrypt.compare(password, results[0].password);
        if (valid) {
            req.session.user = results[0];
            if (req.body.remember)
                req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
            else
                req.session.cookie.expires = false;
            res.redirect('/');
        } else {
            res.flash('error', 'Mot de passe incorrect');
            return res.redirect('/login');
        }
    });
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
});

//Récupération des mangas
app.get('/api/mangas', (req, res) => {
    db.query('SELECT * FROM mangas', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

//port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));

//message d'erreur
app.get('/flash', (req, res) => {
    const error = req.flash('error')[0];
    res.json({ message: error || null });
});

//mot de passe oublier
app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'user', 'forgot-password.html'));
});

app.post('/forgot-password', (req, res) => {
  const email = req.body.email;
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600000); // 1h

  db.query('UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?',
    [token, expires, email], (err, result) => {
      if (err || result.affectedRows === 0) return res.send("Aucun compte associé.");

      // Envoi d'email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      });

      const resetUrl = `http://localhost:3000/reset-password/${token}`;
      const mailOptions = {
        to: email,
        subject: 'Réinitialisation de mot de passe',
        html: `<p>Voici le lien pour réinitialiser votre mot de passe :</p><a href="${resetUrl}">${resetUrl}</a>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.send("Erreur d'envoi : " + error);
        res.send("Email envoyé !");
      });
    });
});

app.get('/reset-password/:token', (req, res) => {
  const token = req.params.token;
  db.query('SELECT * FROM users WHERE reset_token = ? AND reset_expires > NOW()', [token], (err, results) => {
    if (err || results.length === 0) return res.send("Lien invalide ou expiré.");
    res.sendFile(path.join(__dirname, 'user', 'reset-password.html'));
  });
});

app.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE reset_token = ? AND reset_expires > NOW()',
    [hashedPassword, token],
    (err, result) => {
      if (err || result.affectedRows === 0) return res.send("Lien expiré ou invalide.");
      res.send("Mot de passe modifié ! Vous pouvez vous reconnecter.");
    });
});
