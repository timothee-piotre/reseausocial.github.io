// server.js
const express = require('express');
const { connectDB } = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));
app.use('/api/photos', require('./routes/photoRoutes'));

// Sync database and start server
const startServer = async () => {
    try {
        await sequelize.sync();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

startServer();
