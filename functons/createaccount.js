async function createaccount(data){
  data['sfollowers']=0;
  data['sfollowing']=0;
  data['sposts']=0;
  data['spostsdata']='';
  data['svideos']=0;
  data['svphotos']=0;
  data['svideosdata']='';
  data['svphotosdata']='';
  data['sfollowersdata']='';
  data['sfollowingdata']='';
  data['snotifications']='';
  delete data.sotp;
    const { MongoClient } = require('mongodb');
    const client = new MongoClient('mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority');
        try {
          // Connect to the MongoDB cluster
          await client.connect();
          console.log('Connected to the MongoDB cluster');
          const database = client.db('instaclone');
          const collection = database.collection('users');
          let {sid} = data;
          let {semail} = data;
          const query1 = { sid: sid };
          const chresult1 = await collection.findOne(query1);
          const query2 = { semail: semail };
          const chresult2 = await collection.findOne(query2);
          if(chresult1){
              return 'Alredy have an account with the userid try another';
          }
          else if(chresult2){
            return 'Alredy have an account with these email id';
          }
          else{
            const result = await collection.insertOne(data);
          }
        } catch (error) {
            // Handle connection errors
            return 'There is a problem in creating account please try again later or check your internet connection';
          } finally {
          // Close the connection when you're done
          await client.close();
        }
        return 'Account created successfully';

    }
    //console.log('data in create function ',data);
    


module.exports = createaccount;