const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');


app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false })); 


app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post('/signup', async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            password: req.body.password
        };

        await collection.insertMany([data]);

    
        res.redirect("http://localhost:3030");
    } catch (error) {
    
        console.error("Error during signup:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });

        if (check && check.password === req.body.password) {
        
            res.redirect("http://localhost:3030");
        } else {
            res.send("Incorrect password");
        }
    } catch (error) {
        
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(3040, () => {
    console.log("Port Connected");
});
