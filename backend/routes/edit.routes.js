const express = require('express');
const edit = require('../controllers/edit.controller');
const protectRoute = require('../middleware/protectRoute');
const route = express.Router();

route.put('/',protectRoute, edit);

module.exports = route;