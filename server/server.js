const express = require('express');
const app = express();
const path = require('path');
const detectRoutes = require('./routes/detect');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/detect', detectRoutes);

app.get('/', (req, res) => {
	res.send('Agro Shikshya Detection Server is Running 🏃‍♂️.');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
