module.exports = class Mqtt {
    constructor(server, aedes, port, ws, httpServer, wsPort, moment, myEmitter) {
      this.server = server;
      this.aedes = aedes;
      this.port = port;
      this.ws = ws;
      this.httpServer = httpServer;
      this.wsPort = wsPort;
      this.moment = moment;
      this.myEmitter = myEmitter;
      this.init();
    }
    init() {
      this.server.listen(this.port, () => {
        console.log('server listening on port', this.port)
      })
      
      this.ws.createServer({
        server: this.httpServer
      }, this.aedes.handle)
      
      this.httpServer.listen(this.wsPort, () => {
        console.log('websocket server listening on port', this.wsPort)
      })
      
      this.aedes.on('clientError', (client, err) => {
        console.log('client error', client.id, err.message, err.stack)
      })
      
      this.aedes.on('connectionError', (client, err) => {
        console.log('client error', client, err.message, err.stack)
      })
      
      this.aedes.on('publish', (packet, client) => {
        if (client) {
          console.log('message from client', client.id)
          if (packet.topic == "temperatureMeasurment") {
            this.myEmitter.emit('newTemperatureMeasurment', packet.payload.toString())
          }
          if (packet.topic == "phMeasurment") {
            this.myEmitter.emit('newPhMeasurment', packet.payload.toString())
          }
        }
      })
      
      this.aedes.on('subscribe', (subscriptions, client) => {
        if (client) {
          console.log('subscribe from client', subscriptions, client.id)
        }
      })
      
      this.aedes.on('client', (client) => {
        console.log('new client', client.id)
      })   
    }
    sendSocketNotification() {

    }
}