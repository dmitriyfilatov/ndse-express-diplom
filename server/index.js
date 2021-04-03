const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser());
app.use(cors());

const userRouter = require('./router/user');
app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;

async function init() {
  try {
    const database = process.env.MONGODB_DATABASE;
    const host = process.env.MONGODB_HOST;
    const port = process.env.MONGODB_PORT;
    const db = `mongodb://${host}:${port}/${database}`;
    await mongoose.connect(db);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
