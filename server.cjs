const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/', require('./routes/ssrRoutes'));
app.use('/api', require('./routes/apiRoutes'));

// 404 and error handlers
const { notFoundHandler, errorHandler } = require('./utils/helpers');
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
