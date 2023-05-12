const express = require('express');

const controller = require('../controllers/controller');

const router = express.Router();

router.route('/home').get(controller.get_home_page);

router.route('/addquote').get(controller.get_add_quote_page).post(controller.add_quote);    

router.route('/getallquotes').get(controller.get_all_quotes);

module.exports = router;
