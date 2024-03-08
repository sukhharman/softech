const { MongoClient } = require('mongodb');

const postCourse = async (req, res) => {
    try {
        const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
        const dbName = 'softechdata';

        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();

        const database = client.db(dbName);
        const coursesCollection = database.collection('courses'); 

        const newCourse = req.body;
        const result = await coursesCollection.insertOne(newCourse);

        console.log(`Course inserted with _id: ${result.insertedId}`);

        await client.close();

        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        console.error('Error in postCourse:', error);

        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = postCourse;
