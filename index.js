const express = require('express');
const path = require('path');

const router = require('./routes/router');

const app = express();


//for pug

/* app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views', 'pug')); */


//for ejs

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'ejs'));


//for handlebars

// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views', 'handle_bars'));


app.use(express.static(path.join(__dirname + '/views' + '/public')));
app.use(express.urlencoded({ extended: true })); 

app.use('/', router);

app.use("*", (req, res) => {    ///show error if user enteres wrong path
    res.render("error",{
        title: "404",
        error_code: "404",
        error_message : "We can't seem to find the page that you're looking for."
    });
});

app.listen(3000, () => {
    console.log("Server started at port 3000...");
});

