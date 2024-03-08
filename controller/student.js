
// const { MongoClient } = require('mongodb');


// //getStudent
// const getStudent = async (req, res) => {
//     try {
//         const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
//         const dbName = 'softechdata'; 

//         const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//         await client.connect();

//         const database = client.db(dbName);
//         const studentsCollection = database.collection('students'); 

//         const query = req.body;

//         const result = await studentsCollection.findOne(query);

//         if (result) {
//             res.status(200).json(result); 
//         } else {
//             res.status(404).json({ message: 'Student not found' }); 
//         }

//         await client.close();
//     } catch (error) {
//         console.error('Error in getStudent:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// //postStudent

// const postStudent = async (req, res) => {
//     try {
//         const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
//         const dbName = 'softechdata';

//         const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//         await client.connect();

//         const database = client.db(dbName);
//         const studentsCollection = database.collection('students'); // Change collection name to 'students'

//         const newStudent = req.body;
//         const result = await studentsCollection.insertOne(newStudent);

//         console.log(`Student inserted with _id: ${result.insertedId}`);

//         await client.close();

//         res.status(201).json({ message: 'Student created successfully', student: newStudent });
//     } catch (error) {
//         console.error('Error in postStudent:', error);

//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };



// //updateStudent

// const updateStudent = async (req, res) => {
//     let client;

//     try {
//         const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
//         const dbName = 'softechdata'; 

//         client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();

//         const database = client.db(dbName);
//         const studentsCollection = database.collection('students'); 

//         const studentId = req.params._id; 
//         const updatedStudentData = req.body;

//         if (!ObjectId.isValid(studentId)) {
//             return res.status(400).json({ message: 'Invalid student ID format' });
//         }

//         const result = await studentsCollection.updateOne(
//             { _id: new ObjectId(studentId) },
//             { $set: updatedStudentData }
//         );

//         if (result.matchedCount > 0) {
//             res.status(200).json({ message: 'Student updated successfully' });
//         } else {
//             res.status(404).json({ message: 'Student not found' });
//         }
//     } catch (error) {
//         console.error('Error in updateStudentController:', error);

//         if (client) {
//             await client.close();
//         }

//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };




// //deleteStudent
// const youConnect = async () => {
//     try {
//         const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
//         const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();
//         return client.db("softechdata");

//     } catch (error) {
//         console.error('Error connecting to MongoDB Atlas:', error);
//         throw error;
//     }
// };

// const deletestudent = async (req, res) => {
//     try {
//         let db = await youConnect();
//         let collection = db.collection('students'); 

//         console.log(req.query.name);
//         var myquery = { "name": req.query.name }; 
//         console.log(myquery);

//         var result = await collection.deleteOne(myquery);

//         if (result.deletedCount === 1) {
//             console.log("1 document deleted");
//             res.status(200).send("Document deleted successfully");
//         } else {
//             console.log("Document not found");
//             res.status(404).send("Document not found");
//         }

//     } catch (err) {
//         console.error('Error deleting document:', err);
//         res.status(500).send("Internal Server Error");
//     }
// };




// module.exports = {
//     getStudent , postStudent , updateStudent ,deletestudent
// }
