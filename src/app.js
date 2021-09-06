require('dotenv').config();
const path = require('path');
const express = require('express');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use('/api', routes);

app.use((req, res, next)=>{
    res.status(404).json({
        'msg': 'not-fount 404'
    });
})

app.listen(PORT, ()=>{
    console.log(`El servidor esta corriedo en el puero ${PORT}`);
});