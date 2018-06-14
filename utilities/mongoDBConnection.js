
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
      console.log("credentials",url,dbName);

      var db = connection.db(dbName);
      dbRetainedObj["connection"] = connection;
      dbRetainedObj["db"] = db;

      // console.log(db);
      db.listCollections().toArray(function(err, collections){
          console.log("connected with db");
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
    console.log(collectionName,dbRetainedObj)
    var mysort = { rating: -1 };
    dbRetainedObj["db"].collection(collectionName)
    .find({},{id:1,name:1,description:1,authorName:1}).sort(mysort)
    .toArray(function(err,results){
      if (err) throw err;
      console.log(results);
      var callbackReturn=[];
      // var AuthIds = [];
      // partial work
      results.forEach(function(item){
        // AuthIds.push(item["authorId"]);
        callbackReturn.push({id:item["id"],name:item["name"],description:item["description"],authorName:item["name"]});
        // findAuthorName("author",item["authorId"],item,callbackReturn,callback)
      })

      // results.forEach(function(item){
      //   AuthIds.push(item["authorId"]);
      //   // callbackReturn.push({id:item["id"],name:item["name"],description:item["description"],authorName:item["name"]});
      //   this.findAuthorName("author",item["authorId"],item,callbackReturn,callback)
      // })

      callback(null,callbackReturn)
    })
  },
  findBooksByAuthorId:function(collectionName,authId,callback){
    dbRetainedObj["db"].collection(collectionName)
    .find({authorId:authId},{id:1,name:1,description:1})
    .toArray(function(err,results){
      if (err) throw err;
      console.log(results);
      var callbackReturn=[];
      results.forEach(function(item){
        callbackReturn.push({id:item["id"],name:item["name"],description:item["description"]})
      })
      callback(null,callbackReturn)
    })
  },
  findAuthorName:function(collectionName,authId,item,callbackReturn,callback){
    dbRetainedObj["db"].collection(collectionName)
    .findOne({authorId:authId},{name:1})
    .toArray(function(err,results){
      if (err) throw err;
      console.log(results);
      callbackReturn.push({id:item["id"],name:item["name"],description:item["description"],authorname:results["name"]});
      callback(null,callbackReturn)
    })
  },
  closeMongoConnections:function(){
      connection.close();
  }
};
