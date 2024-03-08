//updateteacher.js

const { MongoClient, ObjectId } = require('mongodb');

const updateTeacherController = async (req, res) => {
    let client;

    try {
        const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
        const dbName = 'softechdata'; 

        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db(dbName);
        const teachersCollection = database.collection('teachers'); 


        const teacherId = req.params._id;
        const updatedTeacherData = req.body;

        if (!ObjectId.isValid(teacherId)) {
            return res.status(400).json({ message: 'Invalid teacher ID format' });
        }

        const result = await teachersCollection.updateOne(
            { _id: new ObjectId(teacherId) },
            { $set: updatedTeacherData }
        );

        if (result.matchedCount > 0) {
            res.status(200).json({ message: 'Teacher updated successfully' });
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        console.error('Error in updateTeacherController:', error);

        if (client) {
            await client.close();
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = updateTeacherController;
