const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();


app.use(bodyParser.json());



const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
const dbName = 'softechdata';


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



client.connect()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });




    app.post('/login', async (req, res) => {




        
    const { username, password } = req.body;

    const usersCollection = client.db(dbName).collection('users');
    const user = await usersCollection.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, 'secret_key', { expiresIn: '1h' });

    res.json({ token });
});



app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
});


function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}


module.exports =verifyToken;
