const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let mock_data = [];
app.use(bodyParser.urlencoded({ extended: true }));

// Basic GET
app.get('/ping',(req,res) => {
    res.send("pong");
})

// CREATE DATA
app.post('/form',(req,res) => {
    const id = req.body.id;
    const type = req.body.type;
    const amount = req.body.amount;
    
    mock_data.push({
        "id":id,
        "type":type,
        "amount":amount
    });
    
    console.log(mock_data);
    res.send("data add");
})

// READ DATA
app.get('/get',(req,res) => {
    const id = req.query.id;
    let data = null;
    data = mock_data.find( (value) => {
        if (value.id == id) {
            return value;
        }
    });

    if (data) {
        res.send(`${data.id} ${data.type} ${data.amount}`);
    } else {
        res.send('No data');
    }
})

// DELETE DATA
app.get('/delete',(req,res) => {
    const id = req.query.id;
    let data = mock_data.filter( (value) => {
        if (value.id != id) {
            return value;
        }
    });
    mock_data = data;

    console.log(mock_data);
    res.send(mock_data);
})

// LISTERNING ON PORT
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
