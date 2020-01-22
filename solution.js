var mongo = require('mongodb').MongoClient
const process = require('process');
const age = parseInt(process.argv[2]);
let url = "mongodb://localhost:27017/learnyoumongo";
  mongo.connect(url, function(err, db) {
    const dbo = db.db("learnyoumongo");
    (dbo.collection("parrots").find({age:{$gt:+age}})).toArray((err, res) => {
      if (err) throw err;
      console.log(res);
      //dbo.close();
    })

    (dbo.collection("parrots").find({age:{$gt:+age}},{projection:{name:1, age:1, _id:0}})).toArray((err, res) => {
      if (err) throw err;
      console.log(res);
      dbo.close();
    })
})