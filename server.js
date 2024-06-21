const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();

// Conexión a MongoDB
mongoose.connect('your-mongodb-atlas-uri', { useNewUrlParser: true, useUnifiedTopology: true });

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Configuración de EJS
app.set('view engine', 'ejs');

// Rutas
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/product', require('./routes/product'));

// Servir archivos estáticos
app.use(express.static('public'));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
