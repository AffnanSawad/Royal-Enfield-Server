const express = require('express')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000
require('dotenv').config();

// middleware
app.use(express.json());
app.use(cors());


// copy paste from MongoDb : cluster => connect => driver => 3no.

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@atlascluster.5qhzsjb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    //  Code 
    
    // Database For Bikes Cards Data's
    const database = client.db("Royal-Enfield");
    const bikesData = database.collection("bikesData");

    // my cart collection 

    const myCartsCollection = client.db("Royal-Enfield").collection("carts")


    //1. database er bikesData gulo collect kore then show in UI.
    
    
    //2. UI ER FETCH E localhost/bikesData link bosano => http://localhost:5000/bikesData

   
    app.get( '/bikesData', async(req,res)=>{

       const cursor = bikesData.find();
       const result = await cursor.toArray();

       res.send(result);


    }  )


    //  Bikes Card Data's Ends Here....




  // my_cart_data's:

  // 1 . POST DATA ON SERVER | BACKEND


  app.post( '/carts' , async(req,res)=>{

    const user = req.body ;

    const  result = await myCartsCollection.insertOne(user);

    res.send(result);
   
  }
)
   

  //  2 . GET DATA FROM  SERVER |BACKEND
  
app.get( '/carts' , async(req,res)=>{
     
    // email filtering and get data as the email
    const email = req.query.email;
    
    const query = {email : email}
    
    const result = await myCartsCollection.find(query).toArray();

    res.send(result);

  })

  //  delete item from my cart
  app.delete( '/carts/:id' , async(req,res)=>{
     
    const id = req.params.id;

    const query = { _id : new ObjectId(id)  };

    const result = await myCartsCollection.deleteOne(query);

    res.send(result);


  })










    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




// run server
app.get('/', (req,res)=>{
  
    res.send("Royal-Enfield-Server Running")

})

app.listen(port ,  ()=>{
    console.log(`Royal Enfield Bangladesh Running on : ${port}`)
} )
