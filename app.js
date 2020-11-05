const port = 3000;
const FORM = require('./writeform');
const DATA = require('./aws');
const express = require('express');
const app=express();

app.use(express.static('/public'));
app.get('/',DATA);
app.get('/new',DATA);
app.get('/edit',DATA);
app.get('/create',DATA);
app.get('/save',DATA);
app.get('/delete',DATA);
app.listen(port,function(){
    console.log(`Server starting at port ${port} `);
})
