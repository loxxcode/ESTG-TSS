const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./DB.js');
const annoucement_router = require('./routers/annoucement_router.js');
const event_news_router = require('./routers/event_news_route.js');
dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/announcement', annoucement_router);
app.use('/api/event-news', event_news_router);


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
