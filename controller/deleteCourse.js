const { MongoClient } = require('mongodb');

const youConnect = async () => {
    try {
        const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        return client.db("softechdata");

    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        throw error;
    }
};

const deleteCourse = async (req, res) => {
    try {
        let db = await youConnect();
        let collection = db.collection('courses'); 

        console.log(req.query.name);
        var myquery = { "name": req.query.name }; 
        console.log(myquery);

        var result = await collection.deleteOne(myquery);

        if (result.deletedCount === 1) {
            console.log("1 document deleted");
            res.status(200).send("Document deleted successfully");
        } else {
            console.log("Document not found");
            res.status(404).send("Document not found");
        }

    } catch (err) {
        console.error('Error deleting document:', err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = deleteCourse;
