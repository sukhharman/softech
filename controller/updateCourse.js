const { MongoClient, ObjectId } = require('mongodb');

const updateCourseController = async (req, res) => {
    let client;

    try {
        const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
        const dbName = 'softechdata'; 

        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db(dbName);
        const coursesCollection = database.collection('courses'); 

        const courseId = req.params._id; 
        const updatedCourseData = req.body;

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: 'Invalid course ID format' });
        }

        const result = await coursesCollection.updateOne(
            { _id: new ObjectId(courseId) },
            { $set: updatedCourseData }
        );

        if (result.matchedCount > 0) {
            res.status(200).json({ message: 'Course updated successfully' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error('Error in updateCourseController:', error);

        if (client) {
            await client.close();
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = updateCourseController;
