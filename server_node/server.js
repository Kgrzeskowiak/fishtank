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
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
var http = require("http").createServer(app);
const httpServer = require('http').createServer();
const Database = require("./DbHandler.js");
const SocketHandlerClass = require('./SocketHandler.js');
const MqttServerClass = require ('./Mqtt.js');
const AlertClass = require ('./AlertHandler.js');
const alertHandler = new AlertClass(myEmitter);
const dbConnection = new Database();
const socketInstance = new SocketHandlerClass(http);
const mqttPort = 1883;
const wsPort = 8888;
const MqttInstance = new MqttServerClass(server, aedes, mqttPort, ws, httpServer, wsPort, moment, myEmitter);


myEmitter.on('newTemperatureMeasurment', (temperature) => {
    var temperatureMeasurment = prepareMeasurmentObject(temperature, "Water Temperature");
    dbConnection.addNewMeasurment(temperatureMeasurment);
    socketInstance.sendNewTemperatureReading(temperature);
    if(alertHandler.alertCheck(temperatureMeasurment)) {
        console.log('temperature alert')
    }
});
myEmitter.on('newPhMeasurment', (phLevel) => {
    var phMeasurment = prepareMeasurmentObject(phLevel, "Ph level");
    dbConnection.addNewMeasurment(phMeasurment);
    socketInstance.sendNewPhReading(phLevel);
    if(alertHandler.alertCheck(phMeasurment)) {
        console.log('ph alert');
    }
})

function prepareMeasurmentObject(value, sensor) {
    return measurment = {sensor : sensor, value: value, date : moment().format("YYYY-MM-DD HH:mm")}
}

const mqtt = require('mqtt')
var client = mqtt.connect('http://localhost:1883');

function publishTemperature() {
    client.publish("temperatureMeasurment", "26")
};
function publishPh() {
    client.publish("phMeasurment", "16")
}

publishTemperature();
// publishPh();





 
