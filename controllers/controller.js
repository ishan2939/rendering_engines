const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, '/../data', 'quotes.json');

let quotes = [];    //global variable to store quotes

exports.get_home_page = (req, res) => { //get home page

    fs.readFile(p, 'utf-8', (err, data) => {    //read quotes from file

        if (err) {  //if error then render the error page
            res.render("error", {
                title: 500,
                error_code: 500,
                error_message: "No such file or directory found."
            });
        }
        else {

            quotes = JSON.parse(data);  //parse data

            if (quotes.length == 0) //if their size is 0
                return res.render("home", {    //render home page no quotes
                    path: "/home",//to handle navbar
                    title: "Home",//to handle page title
                    quote: 'There exists no quotes in database, please add them first.',//quote
                    person: 'Ishan Harkhani'//quotee
                    
                });

            //if size is not zero
            let index = Math.floor(Math.random() * quotes.length); //get random index

            res.render("home", {    //render home page with random quote

                path: "/home",//to handle navbar
                title: "Home",//to handle page title
                quote: quotes[index].quote,//quote
                person: quotes[index].quotee//quotee
                
            });
        }
    });
};

exports.get_all_quotes = (req, res) => {    //get all quotes

    fs.readFile(p, 'utf-8', (err, data) => {    //read quotes from file
        if (err) {
            res.render("error", {
                title: 500,
                error_code: 500,
                error_message: "No such file or directory found."
            })
        }
        else {
            res.render("get_all_quotes", {  //render get_all_quotes with quotes
                quotes: JSON.parse(data),
                hasQuotes: JSON.parse(data).length != 0 ? true : false,
                path: '/getallquotes',
                title: 'Get All Quotes'
            });
        }
    });

};

exports.add_quote = async (req, res) => {//add quote to file

    fs.readFile(p, 'utf-8', (err, data) => {    //read quote from file

        if (err) {  //if any error then render error page

            res.render("error", {
                title: 500,
                error_code: 500,
                error_message: "No such file or directory found."
            });

        }
        else {

            quotes = data ? JSON.parse(data) : [];  //get quotes

            if (req.body.quote && req.body.quotee) {    //if data is valid

                quotes.push({ quote: req.body.quote, quotee: req.body.quotee });    //push new quote to quotes array

                fs.writeFile(p, JSON.stringify(quotes), (err) => {  //write that array to file

                    if (err) {  //if error then render the error page
                        return res.render("error", {
                            title: 500,
                            error_code: 500,
                            error_message: "For some reason we were not able to store your data"
                        });
                    }
                    res.redirect('/home');  //else redirect to home page
                });

            }
            else    //if data is not valid then show alert
                alert('Enter valid values only.')
        }
    });


    //2nd way
    // const data= await fs.promises.readFile(p, 'utf-8');
    // let products = data ? JSON.parse(data) : [];
    // products.push({ quote: req.body.quote, quotee: req.body.quotee });
    // await fs.promises.writeFile(p,JSON.stringify(products));
    // res.redirect('/home');

};

exports.get_add_quote_page = (req, res) => {

    res.render('add_quote', {   //render add quote page
        path: "/addquote",
        title: "Add quote"
    });

};
