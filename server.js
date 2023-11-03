// 서버임 아무튼

const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// app.get('/', (req, res) => {
//   btcPriceURL = "https://api1.binance.com/api/v3/ticker/price?symbol=BTCBUSD"
//   https.get(btcPriceURL, function(btcRes) {
//     btcRes.on("data", function(data) {
//       const btcPrice = JSON.parse(data)
//       res.send(btcPrice)
//     })
//   })})

app.post("/", function(req, res) {
  const coinPair = req.body.coinPair
  const url = "https://api1.binance.com/api/v3/ticker/price?symbol=" + coinPair
  https.get(url, function(resData) {
    resData.on("data", function(data){
      const coinData = JSON.parse(data)
      const symbol = coinData.symbol
      const price = coinData.price
      res.write("<h1>"+symbol+"</h1>")
      res.write("<p>"+price+"</p>")
      res.send()
    })
  })})