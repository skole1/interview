const express = require('express')
const { engine } = require('express-handlebars');
const path = require('path')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const connectDB = require('./config/db');
const session = require('express-session')
const passport =  require('passport')
const flash = require('connect-flash')


const app = express()

connectDB()

//BodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
// const handlebars = expHbs.create({
//     defaultLayout: 'main',
//     extname: '.handlebars'
// });
// app.engine('handlebars', handlebars.engine);
// app.set('view engine', 'handlebars');

app.engine('.handlebars', engine({
    extname: '.handlebars',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.handlebars');
app.set('views', './views');

//Public folder setup
app.use(express.static(path.join(__dirname, "public"))); 
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
const db = require('./config/db');

require('./config/passport')

app.use('/', require('./routes/index'))
const port = 7000 || process.env.port

app.listen(port, ()=> console.log(`Server Started.....`))



