//connect to mongodb
//http://mongodb.github.io/node-mongodb-native/3.5/tutorials/connect/
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert"); // validate our data entry and our connection to the mongodb database

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "fruitsDB";

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  // only once its done inserting the doc, we close the connection to the database
  findDocuments(db, function () {
    //find documents
    client.close();
  });
});

//https://mongodb.github.io/node-mongodb-native/3.4/quick-start/quick-start/
const insertDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("fruits"); //create a new collection
  // Insert some documents
  collection.insertMany(
    [
      { name: "Apple", score: 8, review: "ha" },
      { name: "Orange", score: 9, review: "haha" },
      { name: "Banana", score: 0, review: "hahaha" }, //insert 3 documents, each document is a fruit
    ],
    function (err, result) {
      assert.equal(err, null); //make sure there is no errors
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length); // enture we have three results that are inserted into collection
      console.log("Inserted 3 documents into the collection");
      callback(result);
    }
  );
};

//https://mongodb.github.io/node-mongodb-native/3.4/quick-start/quick-start/

//Find All Documents
const findDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("fruits");
  // Find some documents
  collection.find({}).toArray(function (err, fruits) {
    //find all ,save it to array
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    // we are going to get back the object that we got from the find function
    //we are going to log fruits
    callback(fruits);
  });
};
