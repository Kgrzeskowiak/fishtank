module.exports = class AlertHandler {
    constructor(myEmitter) {
        this.temperatureAlertLevel = 25;
        this.phAlertLevel = 8;
        this.myEmitter = myEmitter;
        
    }
    alertCheck(measurment) {
        if (measurment.sensor == "Water Temperature") {
            if (measurment.value > this.temperatureAlertLevel) {
                this.myEmitter.emit('waterTemperatureAlert', measurment);
                return true;
            }
        }
        if (sensor == "Ph level") {
            if (measurment.value > this.phAlertLevel) {
                this.myEmitter.emit('phLevelAlert', measurment);
                return true;
            }
        }
    }
}