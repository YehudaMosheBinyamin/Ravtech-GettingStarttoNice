const { isMainThread, Worker } = require("worker_threads");

if (isMainThread) {
  const workerData = [1, -2, 3];
  const worker = new Worker(__filename, { workerData });
  worker.on("message", (partialSum) => {
    console.log(partialSum);
  });
} else {
  const { parentPort, workerData } = require("worker_threads");
  const sum = workerData.reduce((a, b) => a + b, 0);
  parentPort.postMessage(sum);
}

/** 
PS C:\Users\danbe\Ravtech-GettingStarttoNice\AWS_S3_Practice> node Question2.js
2
*/
