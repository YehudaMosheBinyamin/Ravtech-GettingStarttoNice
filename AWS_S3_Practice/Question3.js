const { text } = require("stream/consumers");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = new S3Client();
const { promisify } = require("util");
const { readableStreamToString } = require("@aws-sdk/util-stream-node");
async function func() {
  let command = new GetObjectCommand({
    Bucket: "ravtech-bucket-30",
    Key: "config.json",
  });
  let response;
  try {
    response = await s3.send(command);
    let str = await text(response.Body);
    let json_parsed = await JSON.parse(str);
    console.log(JSON.stringify(json_parsed));
  } catch (err) {
    console.log(err.message);
  } finally {
    const bytes = await response.Body.transformToByteArray();
  }
}
func();

/** 
PS C:\Users\danbe\Ravtech-GettingStarttoNice\AWS_S3_Practice> node Question3.js
{
  "appName": "YehudaApp",
  "version":  "5.00"
}
  */

/**
 * PS C:\Users\danbe\Ravtech-GettingStarttoNice\AWS_S3_Practice> node Question3.js
{"appName":"YehudaApp","version":"5.00"}
 */
