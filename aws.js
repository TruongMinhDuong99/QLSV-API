const AWS = require('aws-sdk');
const FORM = require('./writeform');
const express=require('express');
const router=express.Router();
AWS.config.update({
  region: "us-west-2",
    endpoint: "http://localhost:8000",
    accessKeyId: "xxxxxx1",
    secretAccessKey: "xxxxxx1"
});
// AWS.config.update({
//     region: "us-east-2",
//     endpoint: "http://dynamodb.us-east-2.amazonaws.com",
//     accessKeyId:"", secretAccessKey:""
// });
var Global_name = {
  id :'123', 
  mssv:'111111',   
}
let docClient = new AWS.DynamoDB.DocumentClient();
router.get('/',(req,res)=>{
  FORM.PageQLSV(res);
  let params = {
    TableName: "Students"
  };
  let scanObject = {};
  docClient.scan(params, (err, data) => {
    if (err) {
      scanObject.err = err;
    } else {
      scanObject.data = data;
    }
    FORM.writeItemTable(scanObject, res);
  });
});
router.get('/new',(req,res)=>{
  FORM.CreateForm(res);
  res.end();
});
router.get('/edit',(req,res)=>{
    Global_name.id =req.query.ID;
    Global_name.mssv = req.query.MSSV;
    var HoTen=req.query.HoTen;
    var NgaySinh= req.query.NgaySinh;
    var Avata= req.query.Avata;
    FORM.writeEditForm(HoTen,NgaySinh,Avata,res)
});
router.get('/create',(req,res)=>{
  var ID=req.query.ID;
    var MSSV= req.query.MSSV;
    var HoTen=req.query.HoTen;
    var NgaySinh= req.query.NgaySinh;
    var Avata=req.query.Avata;
  let params = {
    TableName: 'Students',
    Item: {
      ID: String(ID),
      MSSV: String(MSSV),     
      HoTen: String(HoTen),   
      NgaySinh: String(NgaySinh),            
      Avata:String(Avata)
    }
  };
  docClient.put(params, (err, data) => {
    if (err) {
      FORM.CreateForm(res);
      res.write('<h5 style="color:red;">Vui lòng nhập đủ các thuộc tính</h5>');
    } else {
      res.redirect('/');
    }
    res.end();
  });
});
router.get('/save',(req,res)=>{
  var ID=Global_name.id;
  var MSSV= Global_name.mssv;
  var HoTen=req.query.HoTen;
  var NgaySinh= req.query.NgaySinh;
  var Avata= req.query.Avata;
  let params = {
    TableName: 'Students',
    Key:{
      "ID": String(ID),
      "MSSV": String(MSSV)
    },
    UpdateExpression: "set #ht=:HoTen,#ns=:NgaySinh, #a=:Avata",
    ExpressionAttributeNames: {
      '#ht':'HoTen',
      '#ns':'NgaySinh',
      '#a' :'Avata'
    },
    ExpressionAttributeValues:{
      ':HoTen':String(HoTen),
      ':NgaySinh':String(NgaySinh),
      ':Avata':String(Avata)
    },
    
  };
  docClient.update(params, (err, data) => {
    if (err) {
      FORM.writeEditForm(HoTen, NgaySinh,Avata, res);
      res.write('<h5 style="color:red;">Vui lòng nhập đủ các thuộc tính</h5>');
    } else {
      res.redirect('/');
    }
    res.end();
  })
});

router.get('/delete',(req,res)=>{
  var ID=req.query.ID;
  var MSSV= req.query.MSSV;
  let params = {
    TableName: 'Students',
    Key:{
      "ID": String(ID),
      "MSSV": String(MSSV)
    }
  };

  docClient.delete(params, (err, data) => {
    if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      res.redirect('/');
    }
    res.end();
  });
});
// module.exports = {
//   getAllItem : getAllItem,
//   createItem : createItem,
//   updateItem : updateItem,
//   deleteItem:deleteItem
// };
module.exports=router;