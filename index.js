const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cf9ne.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('db connected')




async function run() {
    try {
        await client.connect();
        const database = client.db("Admin-power").collection("Tasks");

        app.post('/task', async (req, res) => {
            const tasks = req.body;
            const doc = tasks;
            const result = await database.insertOne(doc);
            res.send(result)
        })

        app.delete('/task/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await database.deleteOne(query);
            res.send(result);

        })

        app.get('/task', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const tasks = await database.find(query).toArray();
            res.send(tasks);
        })

        app.get('/task', async (req, res) => {
            const tasks = await database.find().toArray();
            res.send(tasks);
        })



    } finally {

    }
}
run().catch(console.dir);




















app.get('/', (req, res) => {
    res.send('Alhamdulillah server running');
})

app.listen(port, () => {
    console.log('listening to port', port)
})

