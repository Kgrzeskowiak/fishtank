//const express = require("express");
const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const cors = require("cors");
const app = require('express')();
const ws = require('websocket-stream');
var moment = require('moment');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter();
app.use(cors());
var http = require("http").createServer(app);
const httpServer = require('http').createServer();
const Database = require("./DbHandler.js");
const SocketHandlerClass = require('./SocketHandler.js');
const MqttServerClass = require ('./Mqtt.js');
const AlertClass = require ('./AlertHandler.js');
const RestEndpoint = require ('./RestEndpoint.js');
const alertHandler = new AlertClass(myEmitter);
const dbConnection = new Database();
const socketInstance = new SocketHandlerClass(http);
const restEndpointInstance = new RestEndpoint(app, dbConnection, moment);
const mqttPort = 1883;
const wsPort = 8888;
const MqttInstance = new MqttServerClass(server, aedes, mqttPort, ws, httpServer, wsPort, moment, myEmitter);

function prepareMeasurmentObject(value, sensor) {
    return measurment = {sensor : sensor, value: value, date : moment().format("YYYY-MM-DD HH:mm")}
}

myEmitter.on('newTemperatureMeasurment', (temperature) => {
    var temperatureMeasurment = prepareMeasurmentObject(temperature, "Water Temperature");
    dbConnection.addNewMeasurment(temperatureMeasurment);
    socketInstance.sendNewTemperatureReading(temperature);
    if(alertHandler.alertCheck(temperatureMeasurment)) {
        dbConnection.addNewAlert(temperatureMeasurment);
        socketInstance.sendNewAlert();
    }
});
myEmitter.on('newPhMeasurment', (phLevel) => {
    var phMeasurment = prepareMeasurmentObject(phLevel, "Ph level");
    dbConnection.addNewMeasurment(phMeasurment);
    socketInstance.sendNewPhReading(phLevel);
    if(alertHandler.alertCheck(phMeasurment)) {
        dbConnection.addNewAlert(phMeasurment)
        socketInstance.sendNewAlert();
    }
})
const mqtt = require('mqtt')
var client = mqtt.connect('http://localhost:1883');

function publishTemperature(temperature) {
    client.publish("temperatureMeasurment", temperature.toString())
};
function publishPh(ph) {
    client.publish("phMeasurment", ph.toString())
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
function runMeasurments() {
    setInterval(() => {
        publishTemperature(getRandomInt(15,40));
        publishPh(getRandomInt(0,18));
    },5000)
}
runMeasurments();




 
