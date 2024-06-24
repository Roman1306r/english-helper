const mongoose = require('mongoose');
const CONNECTION_STRING = 'mongodb+srv://maksimag777:dUilds2LpKOxwqBK@mongo.kf8s0ef.mongodb.net/'
const PORT = process.env.PORT || 5000

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");



mongoose.connect(CONNECTION_STRING).then(() => console.log(`App connected to mongo DB`));
// Schema for words of app
const UserSchema = new mongoose.Schema({
    rus: {
        type: String,
        required: true
    },
    eng: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('words', UserSchema);
// User.createIndexes();
const AuthSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});
const Auth = mongoose.model('auth', AuthSchema);



console.log(`App started at port ${PORT}`);
app.use(express.json());
app.use(cors());
app.get("/", async (req, resp) => {
    let words = await User.find();
    resp.send(words).status(200);
});

app.get("/auth", async (req, resp) => {
    let adminData = await Auth.find();
    resp.send(adminData).status(200);
});

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});


app.listen(PORT);