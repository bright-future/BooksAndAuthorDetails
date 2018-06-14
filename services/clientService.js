var fs = require("fs");
var grpc = require('grpc');
var configFile =  JSON.parse(fs.readFileSync('./config.json','utf-8'));

var PROTO_PATH = configFile["ProtoPath"]+"books.proto";
var booksProto = grpc.load(PROTO_PATH);

function main() {
  var client = new booksProto.books.booksService('localhost:50051',
                                       grpc.credentials.createInsecure());
  // var user;
  // if (process.argv.length >= 3) {
  //   user = process.argv[2];
  // } else {
  //   user = 'world';
  // }
  client.BooksInRatingOrder({}, function(err, response) {
    console.log('response for query :');
    console.log(response);
  });
  // client.BooksByAuthor({id:3},function(err,response){
  //   console.log('response for query2 :');
  //   console.log(response);
  // });
}

main();
