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
    //Insert data on Collection Parrots
    var doc = {
      firstName: firstName
    , lastName: lastName
    }

    dbo.collection('parrots').insert(doc, function(err, data) {
      if (err) throw err
      console.log(JSON.stringify(doc))
      dbo.close()
  })
})



