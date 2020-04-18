module.exports = class DbLite {
    constructor(httpServer, dbConnection, moment) {
        this.httpServer = httpServer;
        this.dbConnection = dbConnection;
        this.moment = moment;
        this.init();
    }
    init() {
        this.httpServer.listen(3000);
        this.startGetEndpoints();
    }
    startGetEndpoints() {
        this.httpServer.get('/getLastTemperatureReading', (req, res) => {
            res.send(this.dbConnection.getLastTemperatureReading());
        });
        this.httpServer.get('/getLastPhReading', (req,res) => {
            res.send(this.dbConnection.getLastPhReading());
        });
        this.httpServer.get('/getTodayTemperatureReadings', (req, res) => {
            res.send(this.dbConnection.getTodayTemperatureReadings(this.moment().format("YYYY-MM-DD")))
        });
        this.httpServer.get('/getTodayPhReadings', (req, res) => {
            res.send(this.dbConnection.getTodayPhReadings(this.moment().format("YYYY-MM-DD")))
        });
        this.httpServer.get('/getAlerts', (req, res) => {
            var today = this.moment().format("YYYY-MM-DD");
            var yesterday = this.moment().subtract(1, 'days').format("YYYY-MM-DD")
            res.send(this.dbConnection.getAlerts(today, yesterday))
        })
    }
}