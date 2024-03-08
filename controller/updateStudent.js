const { MongoClient, ObjectId } = require('mongodb');

const updateStudentController = async (req, res) => {
    let client;

    try {
        const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
        const dbName = 'softechdata'; 

        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db(dbName);
        const studentsCollection = database.collection('students'); 

        const studentId = req.params._id; 
        const updatedStudentData = req.body;

        if (!ObjectId.isValid(studentId)) {
            return res.status(400).json({ message: 'Invalid student ID format' });
        }

        const result = await studentsCollection.updateOne(
            { _id: new ObjectId(studentId) },
            { $set: updatedStudentData }
        );

        if (result.matchedCount > 0) {
            res.status(200).json({ message: 'Student updated successfully' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        console.error('Error in updateStudentController:', error);

        if (client) {
            await client.close();
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = updateStudentController;
