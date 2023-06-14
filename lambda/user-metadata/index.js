const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const dynamoDBClient = new DynamoDBClient();
const { DateTime } = require("luxon");
const currentDateTime = DateTime.now();
const now = currentDateTime.toFormat("MM/dd/yy hh:mm:ss a");

exports.handler = async (event) => {
  try {
    for (const record of event.Records) {
      const body = JSON.parse(record.body);
      console.log("Received message:", body);
      const {
        username,
        user_id,
        email,
      } = body;

      if (
        !username ||
        !user_id ||
        !email
      ) {
        throw new Error("Missing one or more parameters");
      }

      console.log(`Storing user metadata for ${username}`);

      const item = {
        TableName: process.env.USER_METADATA_TABLE_NAME,
        Item: {
          username: { S: username },
          email: { S: email },
          onboarding_status: { S: "" },
          created_at: { S: now },
          updated_at: { S: now },
        },
      };

      const putItemCommand = new PutItemCommand(item);
      await dynamoDBClient.send(putItemCommand);
    }

    return {
      statusCode: 200,
      body: "Success",
    };
  } catch (error) {
    console.error("Error processing SQS records:", error);
    return {
      statusCode: 500,
      body: "Error",
    };
  }
};
