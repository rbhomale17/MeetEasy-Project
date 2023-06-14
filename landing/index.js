const express = require('express');
const multer = require('multer');
const { MongoClient, ObjectId } = require('mongodb');
const CORS = require('cors');

const app = express();
const upload = multer();
app.use(CORS())
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'fileuploads';

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const client = new MongoClient(mongoURI);
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('files');

        const { originalname, buffer, mimetype } = req.file;

        // Insert the file as binary data into the MongoDB collection
        const result = await collection.insertOne({ originalname, data: buffer, mimetype });
        let id = result.insertedId;
        console.log(id)
        await client.close();
        console.log(`http://localhost:3000/files/${id}`)
        res.json({ link: `http://localhost:3000/files/${result.insertedId}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during file upload.' });
    }
});

// for getting image from DB after passing Image (_id)
app.get('/files/:id', async (req, res) => {
    try {
        const client = new MongoClient(mongoURI);
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
