const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false })); // for parsing


app.get('/', (req, res) => {
    fs.readFile('chat.txt', (err, data) => {
        if (err) {
            console.log(err);
        }
        res.send(
            `${data}<br><form action="/" method="POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')">
            <input type ="text" name="message" id="message">
            <input type="hidden" name="username" id="username">
            <br/>
            <button type="submit"> SEND </button>
            </form>`
        );
    });
  
});

app.post("/", (req, res) => {
    console.log("received message");
    let data = req.body;
    console.log(data.username);
    console.log(data.message);

    fs.writeFile("chat.txt", `${data.username} : ${data.message}`, {flag: 'a'}, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

app.get("/login", (req, res) => {
    res.send(`<form action="/" method="POST" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
        <input type="text" name="username" id="username">
        <br/>
        <button type="submit">Login</button>
    </form>`);
})




app.listen(3000);