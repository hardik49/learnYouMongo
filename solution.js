var mongo = require('mongodb').MongoClient
const process = require('process');
const age = parseInt(process.argv[2]);
let url = "mongodb://localhost:27017/learnyoumongo";
let firstName = process.argv[2]
let lastName = process.argv[3]
mongo.connect(url, function(err, db) {
  const dbo = db.db("learnyoumongo");
  //Explored Find Query
  (dbo.collection("parrots").find({age:{$gt:+age}})).toArray((err, res) => {
    if (err) throw err;
    console.log(res);
  })    
  //Explored Projection with Find
  (dbo.collection("parrots").find({age:{$gt:+age}},{projection:{name:1, age:1, _id:0}})).toArray((err, res) => {
    if (err) throw err;
    console.log(res);
    dbo.close();
  })
  //Insert data on Collection Users
  var doc = {
    firstName: firstName
  , lastName: lastName
  }
  dbo.collection('users').insert(doc, function(err, data) {
    if (err) throw err
    console.log(JSON.stringify(doc))
    dbo.close()
  })
  //Update data on Colllection Users
  dbo.collection("users").update({
    username: 'tinatime'
  }, {
    $set: {
      age: 40
    }
  }, function(err) {
    if (err) throw err
    db.close()
  })
  //Remove data on Collection
  dbo.collection(process.argv[3]).remove({
    _id: process.argv[4]
  },function(err) {
    if (err) throw err
    db.close()
  })
  //Count all documents where age is greater than the first argument passed to your script
  dbo.collection("parrots").count({
    age: {$gt: +process.argv[2]}
  },function(err, count) {
    if (err) throw err
    console.log(count);
    db.close();
  })
})



