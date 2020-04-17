module.exports =  class SocketHandler {
    constructor(http) {
        this.http = http;
        this.io = require("socket.io")(this.http);
        this.init();
    }
    init() {
        this.io.on("connection", function(socket) {
            console.log(socket.id + 'connected');
            socket.on("disconnect", function() {
            console.log(socket.id + 'disconnected');
            });
        });
        this.http.listen(5000, function() {
            console.log("Socket IO is running on 5000");
        });
    }
    sendNewPhReading(phValue) {
        this.io.emit("newPhReading", phValue);
    }
    sendNewTemperatureReading(temperatureValue){
        this.io.emit("newTemperatureReading", temperatureValue);
    }
}