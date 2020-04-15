//const express = require("express");
var SocketHandler = require('./SocketHandler.js')
var cors = require("cors");
const app = require('express')();
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
var http = require("http").createServer(app);
const database = require("./DbHandler.js");
const dbConnection = new database();
const socket = new SocketHandler(http);


 
