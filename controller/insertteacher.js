//insertteacher.js

const { MongoClient } = require('mongodb');

const postTeacher = async (req, res) => {
    try {
        const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
        const dbName = 'softechdata'; 

        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();

        const database = client.db(dbName);
        const teachersCollection = database.collection('teachers'); 

        const newTeacher = req.body;
        const result = await teachersCollection.insertOne(newTeacher);

        console.log(`Teacher inserted with _id: ${result.insertedId}`);

        await client.close();

        res.status(201).json({ message: 'Teacher created successfully', teacher: newTeacher });
    } catch (error) {
        console.error('Error in postTeacher:', error);

        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = postTeacher;
