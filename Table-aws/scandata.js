const AWS = require('aws-sdk');

AWS.config.update({
  region: "us-west-2",
    endpoint: "http://localhost:8000",
    accessKeyId: "xxxxxx1",
    secretAccessKey: "xxxxxx1"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: 'Students',
};
console.log('Scanning Users table.');

docClient.scan(params, onScan);
function onScan(err, data) {
  if (err) {
    console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Scan succeeded.');
    data.Items.forEach((user) => {
      console.log(user.HoTen, user.MSSV);

    });

    if (typeof data.LastEvaluatedKey !== 'undefined') {
      console.log('Scanning for more...');
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      docClient.scan(params, onScan);
    }
  }
}
