const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

app.use(cors());
app.use(express.json());

let users = [];

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', (req, res) => {
    const { username, age } = req.body;
    const newUser = {
        id: users.length + 1,
        username,
        age
    }
    users.push(newUser);
    res.json(users)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 