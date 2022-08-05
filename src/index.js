const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//  initializations
const app = express();

//  settings
app.set('port', process.env.PORT || 4000);  //  validacion: si hay un puerto definido usa ese sino usa el 4000
app.set('views', path.join(__dirname, 'views')); //  dirname: obtiene el nombre del directorio que se esta ejecutando
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', //  configurar para que identifique .handlebars como .hbs
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

//  middlewares: peticiones cliente - servidor
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));  //  acepta desde los formularios los datos que envie el usuario, extended: false - no acepta imagenes, solo datos
app.use(express.json());

//  global variables
app.use((req, res, next) => {
    next(); //  continua con el codigo
});

//  routes
app.use(require('./routes'));   //  importa el index.js
app.use(require('./routes/authentication'))
app.use('/links', require('./routes/links'))    //  precede el /links

//  public
app.use(express.static(path.join(__dirname, 'public')));

//  starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});