const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const cors = require('cors');
const connectDB = require('./database/DB.js');
const session = require("express-session")
const MongoStore = require("connect-mongo")
const event_route = require('./routers/event_route.js');
const updates_route = require('./routers/updates_route.js');
const account_routes = require('./routers/account_routes.js');
const Accountmodel = require("./models/account_schema")
const app = express();
connectDB();

app.use(cors({ origin: "http://localhost:8000", credentials: true })); // Allow requests from the frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware (without MongoStore)
app.use(session({
  secret: "ddklddk", // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: `${process.env.MONGODB_URI}`, // MongoDB URL
    collectionName: 'sessions', // Optional: name of the collection to store sessions
  }),
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 30, sameSite: 'lax' }
}));

// API Routes
app.use('/api', event_route);
app.use('/api', updates_route);
app.use('/api/account', account_routes);


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
