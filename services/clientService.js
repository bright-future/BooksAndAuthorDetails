var fs = require("fs");
var grpc = require('grpc');
var configFile =  JSON.parse(fs.readFileSync('./config.json','utf-8'));

var PROTO_PATH = configFile["ProtoPath"]+"maths.proto";

var mathsProto = grpc.load(PROTO_PATH);

function main() {
  var client = new mathsProto.maths.additionService('localhost:50051',
                                       grpc.credentials.createInsecure());
  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }
  client.Addtion({var1: 5,var2:9}, function(err, response) {
    console.log('sum = :', response);
  });
}

main();
