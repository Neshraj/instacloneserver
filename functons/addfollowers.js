async function Addfollowers(data){
    const { MongoClient } = require('mongodb');
    const uri = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    try {
        await client.connect();
    
        const database = client.db('instaclone');
        const collection = database.collection('users');
    
        // Check if the email exists in the database
        let {semail} = data;
        let {upid} = data;
        const result = await collection.updateOne(
            { sid: upid },
            { $inc: { sfollowers: 1 } } )

        
        
            
            const reqdata = await collection.findOne(
                { semail: semail })
            let {sid} = reqdata;
            let fqp =sid;

            const adddata = await collection.findOne(
                { sid: upid });
                let {sfollowersdata} = adddata;
                let nsfollowersdata=sfollowersdata+','+fqp;


            const upresult = await collection.updateOne(
            { sid: upid },
            { $set: { sfollowersdata: nsfollowersdata } })
            const fqresult = await collection.updateOne(
              { sid: fqp },
              { $inc: { sfollowing: 1 } } )


            const frpdata = await collection.findOne(
              { sid: fqp });
              let {sfollowingdata} = frpdata;
              let nsfollowingdata=sfollowingdata+','+upid;


          const frpupresult = await collection.updateOne(
          { sid: fqp },
          { $set: { sfollowingdata: nsfollowingdata } })

          //Updating notificationdata

          const notdata = await collection.findOne(
            { sid: upid });
            let {snotifications} = notdata;
            let nsnotifications=snotifications+','+fqp+'fwr';

          const nr = await collection.updateOne(
            { sid: upid },
            { $set: { snotifications: nsnotifications } })



                

                
        if (result) {
          // Update the password for the matched email
          //console.log('lofree',result);
          //return ('ok');
        } else {
          //return ('sorry! there is some problem in fetching user details or check your internet connection and try again');
        }
      } catch (error) {
        return ('sorry! there is some problem in fetching user details or check your internet connection and try again');
      } finally {
        await client.close();
      }
    }

  module.exports = Addfollowers;