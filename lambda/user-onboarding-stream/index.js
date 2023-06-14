const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const dynamoDBClient = new DynamoDBClient();
const { DateTime } = require("luxon");
const currentDateTime = DateTime.now();
const now = currentDateTime.toFormat("MM/dd/yy hh:mm:ss a");

exports.handler = async (event) => {
  console.log(event.Records[0].dynamodb);
};
