const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const autocompleteRoutes = require('./routes/autoCompleteRoutes.js');


const app = express();

app.use(cors({
    credentials: true,
    origin: 'https://658e81395e2c058764fdfcdf--jovial-blini-5c2e16.netlify.app',
}))


app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/assets/build')));
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect(process.env.MONGO_URL);


app.use('/api/users', userRoutes);

app.use('/api/projects/', projectRoutes);

app.use('/api/upload', uploadRoutes);

app.use('/autocomplete', autocompleteRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/assets/build', 'index.html'));
  });


app.listen(4000, () => {
    console.log('App is listening on port 4000');
})
