const { addAbortListener } = require('nodemailer/lib/xoauth2');

async function Removefollowers(data){
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
            { $inc: { sfollowers: -1 } } )

        
        
            
            const reqdata = await collection.findOne(
                { semail: semail })
            let {sid} = reqdata;
            let fqp =sid;

            const adddata = await collection.findOne(
                { sid: upid });
                let {sfollowersdata} = adddata;
                
                let index = sfollowersdata.indexOf(fqp);
                if (index !== -1) {
                    let sampledata = sfollowersdata.split(',');
                    sampledata.splice(index, 1);
                    sfollowersdata = sampledata.join(",")
                }
                let nsfollowersdata=sfollowersdata;


            const upresult = await collection.updateOne(
            { sid: upid },
            { $set: { sfollowersdata: nsfollowersdata } })

            const fqresult = await collection.updateOne(
              { sid: fqp },
              { $inc: { sfollowing: -1 } } )


            const frpdata = await collection.findOne(
              { sid: fqp });
              let {sfollowingdata} = frpdata;
              let nindex = sfollowingdata.indexOf(upid);
                if (nindex !== -1) {
                    let sampledata = sfollowingdata.split(',');
                    sampledata.splice(index, 1);
                    sfollowingdata = sampledata.join(",")
                }
              let nsfollowingdata=sfollowingdata;


          const frpupresult = await collection.updateOne(
          { sid: fqp },
          { $set: { sfollowingdata: nsfollowingdata } })


          //Updating notificationdata

          const notdata = await collection.findOne(
          { sid: upid });
          let {snotifications} = notdata;
          let nsnotifications=snotifications+','+fqp+'rfwr';
          
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

  module.exports = Removefollowers;``