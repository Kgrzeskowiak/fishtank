module.exports = class AlertHandler {
    constructor(myEmitter) {
        this.temperatureAlertLevelHigh = 27;
        this.temperatureAlertLevelLow = 20;
        this.phAlertLevelHigh = 7;
        this.phAlertLevelLow = 5;
        this.myEmitter = myEmitter;
        
    }
    alertCheck(measurment) {
        if (measurment.sensor == "Water Temperature") {
            if (measurment.value >= this.temperatureAlertLevelHigh || measurment.value <= this.temperatureAlertLevelLow ) {
                this.myEmitter.emit('waterTemperatureAlert', measurment);
                return true;
            }
        }
        if (measurment.sensor == "Ph level") {
            if (measurment.value >= this.phAlertLevelHigh || measurment.value <= this.phAlertLevelLow) {
                this.myEmitter.emit('phLevelAlert', measurment);
                return true;
            }
        }
    }
}