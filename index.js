const express = require('express')
const app = express();
const courses = require('./routes/courses')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/courses')
    .then(() => console.log('connected to mongo...'))
    .catch(err => console.log(err))
app.use(express.json());
app.use('/api/courses', courses);

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening on port ${port}...`));
