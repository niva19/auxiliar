var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/customers', db.getAllCustomers);
router.post('/api/customers', db.SaveCustomer);

module.exports = router;