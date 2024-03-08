const { MongoClient, ObjectId } = require('mongodb');

const getUser = async (req, res) => {
    try {
        const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
        const dbName = 'softechdata'; 

        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();

        const database = client.db(dbName);
        const usersCollection = database.collection('users');

        const userId = req.params.id; // Assuming the user ID is passed in the URL params

        const userResult = await usersCollection.findOne({ _id: new ObjectId(userId) });

        if (!userResult) {
            res.status(404).json({ message: 'User not found' }); 
            return;
        }

        const teachersCollection = database.collection('teachers');
        const teacherQuery = { userId: userResult._id };
        const teacherResult = await teachersCollection.findOne(teacherQuery);

        if (!teacherResult) {
            res.status(404).json({ message: 'Teacher not found' }); 
            return;
        }

        const studentsCollection = database.collection('students');
        const newStudent = { userId: userResult._id, teacherId: teacherResult._id, name: userResult.name, email: userResult.email }; 

        await studentsCollection.insertOne(newStudent);

        res.status(200).json({ user: userResult, teacher: teacherResult }); 

        await client.close();
    } catch (error) {
        console.error('Error in getUser:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getUser;
