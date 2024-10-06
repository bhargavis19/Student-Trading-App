const express = require('express')
const routes = express.Router()

const tripDetails = require('../controllers/hello.controller')
routes.get('/hello', helloController.hello)

module.exports=routes