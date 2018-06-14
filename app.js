
//imports
var fs = require("fs");
var grpc = require('grpc');
var databaseconnectionObj = require("./utilities/mongoDBConnection");
var configFile =  JSON.parse(fs.readFileSync('./config.json','utf-8'));


var PROTO_PATH = configFile["ProtoPath"]+"books.proto";
var booksProto = grpc.load(PROTO_PATH); //whole book proto is present here

/**
 * Implements the SayHello RPC method.
 */
function books1ServiceHandler(call, callback) {
  // because error is null so null
  console.log("see call",call);
  if(call.request !=null){
    databaseconnectionObj.findBooksByRatings(configFile["collections"][0],callback);
  }
  else{
    callback(new Error('Invalid request'));
  }
}
function books2ServiceHandler(call, callback) {
  // because error is null so null
  console.log("see call",call);
  if(call.request !=null){
    databaseconnectionObj.findBooksByRatings(configFile["collections"][0],callback);
  }
  else{
    callback(new Error('Invalid request'));
  }
}

console.log(databaseconnectionObj)



function main(){
  // database connections
  databaseconnectionObj.initMongo(configFile["dbConnectionAddress"]
                            ,configFile["database"]);
  var Server = new grpc.Server();
  Server.addProtoService(mathsProto.maths.additionService.service,
    {BooksInRatingOrder:books1ServiceHandler,BooksByAuthor:books2ServiceHandler}
  );
  Server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  console.log('grpc server running on port:', '0.0.0.0:50051');
  Server.start();
}

main();
