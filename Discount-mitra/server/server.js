const express = require('express');
const app = express();

app.get('/api/test', (req, res) => res.json({ message: 'ok' }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log('Server running on port', PORT));