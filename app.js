const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ToDo API Routes
app.use('/api/todo', require('./routes/api/todo'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));