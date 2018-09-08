import * as express from 'express';
import * as expressLayouts from 'express-ejs-layouts';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import homeController = require('./controllers/homeController');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    dotenv.load();
}

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views",`${__dirname}/views`);
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(`${__dirname}/../client`));

app.listen(process.env.PORT || 8080, () => {
    console.log(`JF CRM is listening on port ${process.env.PORT || 8080}!`);
});

app.get('/homeController/:action', homeController);
app.get('/', function (req, res) {
    var locals = {
        title: 'Inicio'
      };
    res.render('index', locals);
});
