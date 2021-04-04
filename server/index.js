require('reflect-metadata');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { container } = require('./infrastructure/container');
const bodyParser = require('body-parser');

const app = express();
app.set('ioc_container', container);

app.use(bodyParser());
app.use(cors());

const advertisementsRouter = require('./web/routes/advertisements.routes');
app.use('/api/advertisements', advertisementsRouter);

const authRouter = require('./web/routes/auth.routes')
app.use('/api/', authRouter)

const PORT = process.env.PORT || 3000;
async function init() {
  try {
    const database = process.env.MONGODB_DATABASE;
    const host = process.env.MONGODB_HOST;
    const port = process.env.MONGODB_PORT;
    const db = `mongodb://${host}:${port}/${database}`;
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useNewUrlParser', true);
    await mongoose.connect(db);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
