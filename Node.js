const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let visitorCount = 0;

app.get('/api/visitor-count', (req, res) => {
    res.json({ count: visitorCount });
});

app.post('/api/increment-visitor-count', (req, res) => {
    visitorCount++;
    res.json({ count: visitorCount });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
