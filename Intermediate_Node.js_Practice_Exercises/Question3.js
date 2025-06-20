var https = require("https");
https.get(
  "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
  (res) => {
    res.on("data", (d) => {
      //process.stdout.write(d);
      let dataObj = JSON.parse(d);
      console.log(
        "Symbol:" + dataObj.symbol + " Current Price:" + dataObj.price
      );
    });
  }
);
//Symbol:BTCUSDT Current Price:104522.71000000
