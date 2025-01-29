const express = require('express')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000
require('dotenv').config();

// middleware
app.use(express.json());
app.use(cors());


// copy paste from MongoDb : cluster => connect => driver => 3no.

const { MongoClient, ServerApiVersion } = require('mongodb');
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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
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
