const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const cors = require('cors'); 
const { MongoClient } = require('mongodb');
const { config } = require('dotenv');

config()
const PORT = process.env.SERVER_PORT;
const uri = process.env.MOGNGO_CONNECTION_STRING

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(uri);

client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Function to add or update host on table
async function addToTable(client, hostname){
    await client.connect()
    var myDB = client.db(process.env.DATABASE_NAME).collection(process.env.DATABASE_COLLECTION)
    const existingRecord = await myDB.findOne({ hostname });
    if (existingRecord) {
        await myDB.updateOne({ hostname }, { $inc: { count: 1 } });
    } else {
        await myDB.insertOne({ hostname, count: 1 });
    }
}

// Function to get the top hosts based on count
async function getTopHosts(client) {
    const topHosts = await client
      .db(process.env.DATABASE_NAME)
      .collection(process.env.DATABASE_COLLECTION)
      .find()
      .sort({ count: -1 }) // Sort in descending order based on count
      .limit(5)
      .toArray();
    
      return topHosts;
  }

app.post('/ping', async (req, res) => {
  const { hostname, count } = req.body;

  const command = `ping -n ${count} ${hostname}`;

    exec(command, async (error, stdout) => {
    if (error) {
      return res.status(500).send(error.message);
    }

    await addToTable(client, hostname);
    const topHosts = await getTopHosts(client);

    res.json({pingResult: stdout, topHosts});
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
