module.exports = class DbLite {
    constructor() {
    this.db = require('better-sqlite3')('aqua.db', {readonly : false});
    }
    getTodayTemperatureReadings(currentDate) {
        const sql = this.db.prepare('SELECT * FROM waterTemperature WHERE DATE(date) = @currentDateParam ORDER BY id desc');
        var dataJson = sql.all({currentDateParam : currentDate.toString()});
        return dataJson
    }
    getTodayPhReadings(currentDate) {
        const sql = this.db.prepare('SELECT * FROM ph WHERE DATE(date) = @currentDateParam ORDER BY id desc');
        var dataJson = sql.all({currentDateParam : currentDate.toString()});
        return dataJson
    }
    getLastPhReading() {
        const sql = this.db.prepare('SELECT value, MAX(id) from ph');
        var dataJson = sql.all()
        return dataJson
    }
    getLastTemperatureReading() {
        const sql = this.db.prepare('SELECT value, MAX(id) from waterTemperature');
        var dataJson = sql.all()
        return dataJson
    }
    addNewMeasurment(measurment) {
        if (measurment.sensor == "Water Temperature") {
            const sql = this.db.prepare('INSERT INTO waterTemperature (date, value, sensor) VALUES (?,?,?)');
            sql.run(measurment.date, measurment.value, measurment.sensor);
        }
        if (measurment.sensor == "Ph level") {
            const sql = this.db.prepare('INSERT INTO ph (date, value, sensor) VALUES (?,?,?)');
            sql.run(measurment.date, measurment.value, measurment.sensor);
        }
    }
    addNewAlert(alert) {
        const sql = this.db.prepare('INSERT INTO alerts (date,value,sensor) VALUES (?,?,?)');
        sql.run(alert.date, alert.value, alert.sensor);
    }
    getAlerts(currentDate, yesterdayDate) {
        const sql = this.db.prepare('SELECT * FROM alerts WHERE DATE(date) = @currentDateParam OR @yesterdayDateParam ORDER BY date desc');
        var dataJson = sql.all({currentDateParam : currentDate.toString(), yesterdayDateParam : yesterdayDate.toString()});
        return dataJson;
    }
}
  