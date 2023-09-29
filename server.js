const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
dotenv.config();

connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes'));
app.use('/api/v1/analytics', require('./routes/analyticsRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));

//static files
app.use("/", express.static(path.join(__dirname, "Client", "build")));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
});

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node server is running on ${process.env.DEV_MODE} mode on port ${process.env.PORT}`
      .bgBlue.white
  );
});
