const express = require('express');
const photoRouter = express.Router();
require('dotenv').config();

const multer = require('multer');
const { MongoClient, ObjectId } = require('mongodb');
const upload = multer();
const mongo_url = process.env.mongo_url_photos;
const dbName = process.env.dbName;


// photoRouter.get('/', (req, res) => {
//     res.send('hhihihihohssafbajfbj')
// });

// for getting image from DB after passing Image (_id)
photoRouter.get('/files/:id', async (req, res) => {
    try {
        const client = new MongoClient(mongo_url);
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('files');

        const fileId = req.params.id;

        // Find the file from the MongoDB collection based on the document ID
        const file = await collection.findOne({ _id: new ObjectId(fileId) });

        await client.close();

        if (!file) {
            res.status(404).json({ error: 'File not found.' });
        } else {
            // Set appropriate headers for serving the image
            res.set('Content-Type', file.mimetype);
            res.send(file.data.buffer);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the file.' });
    }
});

photoRouter.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const client = new MongoClient(mongo_url);
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('files');

        const { originalname, buffer, mimetype } = req.file;

        // Insert the file as binary data into the MongoDB collection
        const result = await collection.insertOne({ originalname, data: buffer, mimetype });
        let id = result.insertedId;
        // console.log(id)
        await client.close();
        // console.log(`http://localhost:3000/photos/files/${id}`)
        res.json({ link: `http://localhost:3000/photos/files/${result.insertedId}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during file upload.' });
    }
});


module.exports = { photoRouter }