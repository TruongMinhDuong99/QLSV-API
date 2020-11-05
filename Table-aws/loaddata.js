var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    accessKeyId: "xxxxxx1",
    secretAccessKey: "xxxxxx1"
  });

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing users into DynamoDB. Please wait.");

var allStudents = JSON.parse(fs.readFileSync('studentdata.json', 'utf8'));
allStudents.forEach(function(user) {
    var params = {
        TableName: "Students",
        Item: {
            "ID":user.ID,
            "MSSV":user.MSSV, 
            "HoTen":user.HoTen,
            "NgaySinh":user.NgaySinh,      
            "Avata":user.Avata
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add users", user.HoTen, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", user.HoTen);
       }
    });
});
