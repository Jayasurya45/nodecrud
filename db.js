const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient
const ObjectId=mongodb.ObjectId;


let database;
async function getdatabase(){
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    database=client.db('crud');
    if(!database){
        console.log("database not created ");
        
    }
    return database;

}
module.exports={
    getdatabase,
    ObjectId
}