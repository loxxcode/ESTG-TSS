const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database/DB.js');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const event_route = require('./routers/event_route.js');
const updates_route = require('./routers/updates_route.js');
const account_routes = require('./routers/account_routes.js');
const Accountmodel = require("./models/account_schema");

// Create express app
const app = express();

// Trust first proxy (required for secure cookies behind proxies like Render)
app.set('trust proxy', 1);

// connecting to mongo db database
connectDB()

// Allow listed frontend origins
const allowedOrigins = [
  'http://localhost:8000',
  'http://localhost:3000',
  'https://estg-tss.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware with MongoStore
app.use(session({
  secret: "ddklddk", // Replace with a strong secret in production
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: `${process.env.MONGODB_URI}`, // MongoDB URL
    collectionName: 'sessions', // Optional: name of the collection to store sessions
  }),
  cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 * 30, sameSite: 'none' }
}));

// Routes
app.use('/api', event_route);
app.use('/api', updates_route);
app.use('/api/account', account_routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
