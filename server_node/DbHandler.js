module.exports = class DbLite {
    constructor() {
    this.db = require('better-sqlite3')('aqua.db', {readonly : false});
    }
    getLastPhReading() {
        const sql = this.db.prepare('SELECT value, MAX(id) from ph');
        var dataJson = sql.all()
        return dataJson
    }
    getLastTemperatureReading() {
        const sql = this.db.prepare('SELECT value, MAX(id) from temperature');
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
}
  