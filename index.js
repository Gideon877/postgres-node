const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors'), _ = require('lodash');
const pg = require("pg");
const Pool = pg.Pool;
const Handler = require('./src/handler');

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/moviedb';

const pool = new Pool({
    connectionString
});

const routes = Handler(pool);

const app = express();

app.set("port", (process.env.PORT || 3002));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors())

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 * 30 } }));


app.get('/api/users', routes.users);
app.get('/api/users/:id', routes.getUser);

app.post('/api/users', routes.addUser);

app.get('/api/booking', routes.findBookings);
app.get('/api/booking/:id', routes.findUserBookings);
app.post('/api/booking/:userId', routes.addUserBookings);

const PORT = app.get("port");

app.listen(PORT, function () {
    console.log(`App started at http://localhost:${PORT}`);
});

// http://www.omdbapi.com/?t=scarface&apikey=ae2b9604