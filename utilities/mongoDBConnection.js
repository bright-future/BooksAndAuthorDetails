"use strict"
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
      console.log("connected with db");
      // console.log(db);
  // closeMongoConnections:function(){
      // connection.close();
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
      // var callbackReturn=[];
      var AuthIds = [];
      // partial work
      results.forEach(function(item){
        AuthIds.push(item["authorId"]);
        // callbackReturn.push({id:item["id"],name:item["name"],description:item["description"],authorName:item["name"]});
        // findAuthorName("author",item["authorId"],item,callbackReturn,callback)
      })
      findAuthorName("author",AuthIds,results,callback)
      // results.forEach(function(item){
      //   AuthIds.push(item["authorId"]);
      //   // callbackReturn.push({id:item["id"],name:item["name"],description:item["description"],authorName:item["name"]});
      //   this.findAuthorName("author",item["authorId"],item,callbackReturn,callback)
      // })

      // callback(null,callbackReturn)
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
  findAuthorName:findAuthorName,
  closeMongoConnections:function(){
      connection.close();
  }
};

function findAuthorName(collectionName,authIds,items,callback){

  dbRetainedObj["db"].collection(collectionName)
  .find({id:{$in:authIds}},{id:1,name:1})
  .toArray(function(err,results){
    if (err) throw err;
    console.log("go results of Auth name query");
    var callbackReturn=[];
    items.forEach(function(item){
        var i=0;var j = results.length-1;
        while(i<j){
          var mid = (i+j)/2;
          if(item["authorId"] > results[mid].id){
             i = mid+1;
          }
          else if(item["authorId"] < results[mid].id){
            j = mid -1 ;
          }
          else{
            i = mid;
            j=mid;
          }
        }
        callbackReturn.push({id:item["id"],name:item["name"],description:item["description"],authorName:results[i]["name"]});
      })
      console.log(callbackReturn)
      callback(null,callbackReturn)
      // callbackReturn.push({id:item["id"],name:item["name"],description:item["description"],authorname:results["name"]});
    })

}
