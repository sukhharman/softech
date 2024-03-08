const { MongoClient } = require('mongodb');

const getCourse = async (req, res) => {
    try {
        const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
        const dbName = 'softechdata'; 

        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();

        const database = client.db(dbName);
        const coursesCollection = database.collection('courses'); 

        const query = req.body;

        const result = await coursesCollection.findOne(query);

        if (result) {
            res.status(200).json(result); 
        } else {
            res.status(404).json({ message: 'Course not found' }); 
        }

        await client.close();
    } catch (error) {
        console.error('Error in getCourse:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getCourse;
