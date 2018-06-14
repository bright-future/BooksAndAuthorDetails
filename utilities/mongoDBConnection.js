
// imports
var MongoClient ;
var dbRetainedObj={};

// values
// var configFile =  JSON.parse(fs.readFileSync('../config.json','utf-8'));
// var url =  configFile['dbConnectionAddress'];
// console.log(configFile,url);


//default connection
module.exports = {
  initMongo:function (url,dbName){
     MongoClient = require('mongodb').MongoClient;
     MongoClient.connect(url,function(err,connection){
      if(err) throw err;
      // console.log(dbObj);
      var db = connection.db(dbName);
      dbRetainedObj["connection"] = connection;
      dbRetainedObj["db"] = db;

      // console.log(db);
      db.listCollections().toArray(function(err, collections){
          console.log(collections);
      });
      dbretainedObj = db;
  // closeMongoConnections:function(){
      // connection.close();
    });
  },
  insertCollection:function (object,collectionName){
    dbRetainedObj["db"].collection(collectionName).insertOne(object,function(err,res){
      if(err) throw err;
      console.log("1 inserted");
    });
  },
  findBooksByRatings:function(collectionName,callback){
    var mysort = { rating: 1 };
    dbRetainedObj["db"].collection(collectionName)
    .find({},{id:1,name:1,description:!,authorName}).sort(mysort)
    .toArray(function(err,results){
      if (err) throw err;
      console.log(results);
      callback = [];
      var callbackReturn=[];
      for(result in results){
        callbackReturn.append(result);
      }
      callback(null,callbackReturn)
    })
  },
  findBooksByAuthorId:function(collectionName,authId,callback){
    dbRetainedObj["db"].collection(collectionName)
    .find({authorId:authId},{id:1,name:1,description:!,authorName})
    .toArray(function(err,results){
      if (err) throw err;
      console.log(results);
      callback = [];
      var callbackReturn=[];
      for(result in results){
        callbackReturn.append(result);
      }
      callback(null,callbackReturn)
    })
  },
  closeMongoConnections:function(){
      connection.close();
  }
};
