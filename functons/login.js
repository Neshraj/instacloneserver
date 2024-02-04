async function login(data){
    const { MongoClient } = require('mongodb');
    const client = new MongoClient('mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority');
        try {
          // Connect to the MongoDB cluster
          await client.connect();
          console.log('Connected to the MongoDB cluster');
          const database = client.db('instaclone');
          const collection = database.collection('users');
          let {semail} =data;
          let {spassword} = data;
          let logindata = await collection.find({
            $and: [
              { semail: semail },
              { spassword: spassword }
            ]
          }).toArray((err, logindata) => {
            if (err){
                return 'There is a problem in logging in try again later';
            }
            // Close the connection
            client.close();
          });
          if(logindata.length!==0){
            return true;
          }
          else{
            return  false;
          }
          //const result = await collection.insertOne(data);
        } catch (error) {
            // Handle connection errors
            return 'There is a problem in logging in try again later';
          } finally {
          // Close the connection when you're done
          await client.close();
        }
}



module.exports = login;