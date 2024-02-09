async function AddRmwlike(data){
    const { MongoClient } = require('mongodb');
    const uri = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    try {
        await client.connect();
    
        const database = client.db('reels');
        const collection = database.collection('videos.files');
    
        // Check if the email exists in the database
        let {semail} = data;
        let {userid} = data;
        let {mode} = data;
        let {filename} = data;
        let result;
        if(mode==='Add'){
            result = await collection.updateOne(
                { filename: filename },
                { $inc: { 'metadata.numberOfLikes': 1 } } )
  
                const adddata = await collection.findOne(
                    {filename: filename });
                    //let {metadata} = adddata;
                    let {metadata} = adddata;
                    let {likesdata} = metadata;
                    let nlikesdata=likesdata+','+semail;
    
    
                const upresult = await collection.updateOne(
                { filename: filename },
                { $set: { 'metadata.likesdata': nlikesdata } })


                //To update notifications

                const database2 = client.db('instaclone');
                const collection2 = database2.collection('users');

                const reqdata = await collection2.findOne(
                  { semail: semail })
              let {sid} = reqdata;
              let fqp =sid;

              const notdata = await collection2.findOne(
                { sid: userid });
                let {snotifications} = notdata;
                let nsnotifications=snotifications+','+fqp+'liked1';
                
                const nr = await collection2.updateOne(
                { sid: userid },
                { $set: { snotifications: nsnotifications } })



        }

        else{



            result = await collection.updateOne(
                { filename: filename },
                { $inc: { 'metadata.numberOfLikes': -1 } } )
    
    
                const adddata2 = await collection.findOne(
                    { filename: filename });
                    let {metadata} = adddata2;
                    let {likesdata} = metadata;
                    //likesdata = likesdata.split(',');
                    let nlikesdata;
                    let index = likesdata.indexOf(semail);
                    if (index !== -1) {
                        let sampledata = likesdata.split(',');
                        sampledata.splice(index, 1);
                        nlikesdata = sampledata.join(",")
                    }
    
    
                const upresult = await collection.updateOne(
                { filename: filename },
                { $set: { 'metadata.likesdata': nlikesdata } })


                //To update notifications

              const database2 = client.db('instaclone');
              const collection2 = database2.collection('users');

              const reqdata = await collection2.findOne(
                  { semail: semail })
              let {sid} = reqdata;
              let fqp =sid;
              
              const notdata = await collection2.findOne(
                { sid: userid });
                let {snotifications} = notdata;
                let nsnotifications=snotifications+','+fqp+'unliked2';
                
                const nr = await collection2.updateOne(
                { sid: userid },
                { $set: { snotifications: nsnotifications } })

        }




            

                

      } catch (error) {
        console.log(error);
        return ('sorry! there is some problem in fetching user details or check your internet connection and try again');
      } finally {
        await client.close();
      }
    }

  module.exports = AddRmwlike;