module.exports = class Mqtt {
    constructor() {
        this.init()
    }
    init() {
        var mosca = require("mosca");
        var ascoltatore = {
            type: "redis",
            redis: require("redis"),
            db: 12,
            port: 6379,
            return_buffers: true,
            host: "localhost"
          };
          var moscaSettings = {
            port: 1883,
            backend: ascoltatore,
            persistence: {
              factory: mosca.persistence.Redis
            }
          };
          var server = new mosca.Server(moscaSettings);
          server.on("ready", setup);
          server.on("clientConnected", function(client) {
        
          });
          server.on("published", function(packet, client) {
              //packet.topic
          });
          server.on("clientDisconnected", function(client) {
        
          });
          server.on("subscribed", function(topic, client) {
         
          });
    }
} 
  function setup() {
    console.log("Mosca server is running on 1883");
    // var mqtt = require("mqtt");
    // var options = { clientId: "main_listener" };
    // var mqtt_client = mqtt.connect("mqtt://localhost:1883", options);
    // mqtt_client.on("connect", function() {
    //   mqtt_client.subscribe("sensors/temperature", function(err) {});
    //   mqtt_client.subscribe("register", function(err) {});
    //   mqtt_client.subscribe("sensors/garage_mainGate", function(err) {});
    // });
    // mqtt_client.on("message", function(topic, message) {
    //   var mqttPayload = JSON.parse(message);
    //   if (topic == "sensors/temperature") {
    //     axios
    //       .post("http://192.168.1.9:3000/temperature", {
    //         id: mqttPayload.id,
    //         temp: mqttPayload.temperature,
    //         humidity: mqttPayload.humidity,
    //         location: mqttPayload.location,
    //         date: moment().format("YYYY-MM-DD HH:mm")
    //       })
    //       .then(function(response) {
    //         mqttClientList[mqttPayload.id].lastActivity = moment().format(
    //           "MM DD YYYY HH:mm:ss"
    //         );
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });
    //   }
    //   if (topic == "register") {
    //     mqttClientList[mqttPayload.id].type = mqttPayload.type;
    //     SocketEmit_deviceConnected(mqttClientList[mqttPayload.id]);
    //   }
    //   if (topic == "sensors/garage_mainGate") {
    //     SocketEmit_garageState(mqttPayload.state);
    //     smsAlert.gateStatusUpdate(mqttPayload.state);
    //   }
    //   //client.end()
    // });
  }