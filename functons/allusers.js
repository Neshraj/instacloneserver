async function allusers(){
    const { MongoClient } = require('mongodb');
    const client = new MongoClient('mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority');
        try {
          // Connect to the MongoDB cluster
          await client.connect();
          console.log('Connected to the MongoDB cluster');
          const database = client.db('instaclone');
          const collection = database.collection('users');
          let alluserdata = await collection.find({}, {name: 0 }).toArray();
          return alluserdata;
          //const result = await collection.insertOne(data);
        } catch (error) {
            // Handle connection errors
            return 'There is a problem in fetching users data';
          } finally {
          // Close the connection when you're done
          await client.close();
        }
}



module.exports = allusers;