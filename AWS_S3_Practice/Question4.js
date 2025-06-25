//const obj = { name: "Yehuda" };
const txt = "hello";
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { text } = require("stream/consumers");
let obj_str;
let response = "";
//let file_name = Date.now().toString() + ".txt";
let file_name = "new_file_ravtech.txt";
async function func() {
  try {
    //obj_str = JSON.stringify(obj);
    const s3 = new S3Client({});
    let command = new PutObjectCommand({
      Bucket: "ravtech-bucket-30",
      Key: file_name,
      //Body: JSON.stringify(obj),
      Body: txt,
    });
    response = await s3.send(command);
    console.log(JSON.stringify(response));
    if (!JSON.stringify(response).includes('"httpStatusCode":200')) {
      throw new Error("Error in sending file to AWS");
    } else {
      console.log("Upload was successful");
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (response?.Body) {
      response.Body.destroy();
    }
  }
}
func();

//PS C:\Users\danbe\Ravtech-GettingStarttoNice\AWS_S3_Practice> node Question4.js
//Upload was successful

//When forced an error:
/**
 * PS C:\Users\danbe\Ravtech-GettingStarttoNice\AWS_S3_Practice> node Question4.js
Error: Error in sending file to AWS
    at func (C:\Users\danbe\Ravtech-GettingStarttoNice\AWS_S3_Practice\Question4.js:19:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
 */
