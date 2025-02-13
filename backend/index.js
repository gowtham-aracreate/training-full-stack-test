const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const mongoose = require('mongoose')

app.use(cors());
app.use(express.json());

let users = []; // replacing this


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test');
        console.log("DB connected")

    } catch (err) {
        console.log("Error while connecting DB")
    }
}
connectDB();

// mongoose.connect('mongodb://localhost:27017/test').then(() => console.log("Mongodb Connected")).catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    valid: Boolean
})


const ContactSchema = new mongoose.Schema({
    phone: Number,
    address: String,
})


const User = mongoose.model("user", UserSchema);



app.get('/users', (req, res) => {
    res.json(users)
})


app.post('/create', async (req, res) => {
    const userData = req.body;
    const data = await User.create(
        {
            name: userData.name,
            age: userData.age,
            valid: userData.valid
        }
    );
    res.send(data)
})


app.get('/get-user', async (req, res) => {
    const data = await User.findById();

    res.json(data)
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


