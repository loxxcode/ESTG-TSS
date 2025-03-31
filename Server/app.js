const app = express();
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./DB.js');
const annoucement_router = require('./routers/annoucement.js');
const event_news_router = require('./routers/event_news.js');
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API Routes
app.use('/annoucement', annoucement_router);
app.use('/event_news', event_news_router);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
