require('reflect-metadata');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { container } = require('./infrastructure/container');

const app = express();
app.set('ioc_container', container);

app.use(express.json());
app.use(cors());

const usersRouter = require('./web/routes/users.routes');
app.use('/user', usersRouter);

const advertisementsRouter = require('./web/routes/advertisements.routes');
app.use('/advertisement', advertisementsRouter);

const PORT = process.env.PORT || 3000;
async function init() {
  try {
    const database = process.env.MONGODB_DATABASE;
    const host = process.env.MONGODB_HOST;
    const port = process.env.MONGODB_PORT;
    const db = `mongodb://${host}:${port}/${database}`;
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(db);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
