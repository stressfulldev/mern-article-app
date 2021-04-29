import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoutes from './routes/post.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use('/post', postRoutes);

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Server is running on port: ${port}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})