const { MongoClient } = require('mongodb');

const postStudent = async (req, res) => {
    try {
        const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
        const dbName = 'softechdata';

        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();

        const database = client.db(dbName);
        const studentsCollection = database.collection('students'); // Change collection name to 'students'

        const newStudent = req.body;
        const result = await studentsCollection.insertOne(newStudent);

        console.log(`Student inserted with _id: ${result.insertedId}`);

        await client.close();

        res.status(201).json({ message: 'Student created successfully', student: newStudent });
    } catch (error) {
        console.error('Error in postStudent:', error);

        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = postStudent;
