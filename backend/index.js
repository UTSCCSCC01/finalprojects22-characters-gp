let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
require('dotenv').config();
const createError = require('http-errors');
const multer = require('multer');

//import Routers
const userRoute = require('./routes/user.routes');
const storyRoute = require('./routes/story.routes');
<<<<<<< Updated upstream
const productRoute = require('./routes/product.routes')
=======
<<<<<<< Updated upstream
=======
const productRoute = require('./routes/product.routes')
const orderRoute = require('./routes/order.routes')
>>>>>>> Stashed changes
>>>>>>> Stashed changes

mongoose
  .connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/mydatabase')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

//Using app.use() means that this middleware will be called for every call to the application.
app.use('/stories', storyRoute);
app.use('/users', userRoute);
<<<<<<< Updated upstream
app.use('/products', productRoute);
=======
<<<<<<< Updated upstream
=======
app.use('/products', productRoute);
app.use('/orders', orderRoute);
>>>>>>> Stashed changes
>>>>>>> Stashed changes

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

app.use((req, res, next) => {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
