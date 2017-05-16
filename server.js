import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import mongoose from 'mongoose';
import myApp from './API/src/vote';

// Connect to database
const db = 'crowdsource';
mongoose.connect('mongodb://localhost/' + db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const app = express();