const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const autocompleteRoutes = require('./routes/autoCompleteRoutes.js');


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))

mongoose.connect(process.env.MONGO_URL);


app.use('/api/users', userRoutes);

app.use('/api/projects/', projectRoutes);

app.use('/api/upload', uploadRoutes);

app.use('/autocomplete', autocompleteRoutes);



app.listen(4000, () => {
    console.log('App is listening on port 4000');
})
