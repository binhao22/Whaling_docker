const express = require('express')
const axios = require('axios');
const app = express()
app.use(express.json());

app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// Docker API 엔드포인트
const dockerApiUrl = 'http://localhost:2375';

// /containers GET 요청, Docker API 로부터 컨테이너 리스트를 반환
app.get('/containers', async (req, res) => {
  try {
    const response = await axios.get(`${dockerApiUrl}/containers/json?all=1`);
    if (response.status === 200) {
      res.json(response.data);
    } else {
      console.error(`Failed to retrieve container list. Status code: ${response.status}`);
      res.status(500).send('Failed to retrieve container list');
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    res.status(500).send('An error occurred');
  }
});
// /containers/delete POST 요청, Docker API 로 컨테이너 제거 요청
app.post('/containers/delete', async (req, res) => {
  try {
    const containerId = req.body.containerId; // 클라이언트로부터 컨테이너 ID를 받음
    if (!containerId) {
      res.status(400).json({ error: 'Missing containerId' });
      return;
    }

    // Docker API를 사용하여 컨테이너 제거 요청
    const response = await axios.delete(`${dockerApiUrl}/containers/${containerId}?force=1`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      res.json({ message: 'Container deleted successfully' });
    } else {
      console.error(`Failed to delete container. Status code: ${response.status}`);
      res.status(500).json({ error: 'Failed to delete container' });
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    res.status(500).json({ error: 'An error occurred' });
  }
});





// const https = require('https')
// app.use(bodyParser.urlencoded({extended: true}))

// 바이낸스 BTCBUSD 가격 정보 조회
// app.get('/', (req, res) => {
//   btcPriceURL = "https://api1.binance.com/api/v3/ticker/price?symbol=BTCBUSD"
//   https.get(btcPriceURL, function(btcRes) {
//     btcRes.on("data", function(data) {
//       const btcPrice = JSON.parse(data)
//       res.send(btcPrice)
//     })
//   })})

// 바이낸스 요청된 가격 정보 조회
// app.post("/", function(req, res) {
//   const coinPair = req.body.coinPair
//   const url = "https://api1.binance.com/api/v3/ticker/price?symbol=" + coinPair
//   https.get(url, function(resData) {
//     resData.on("data", function(data){
//       const coinData = JSON.parse(data)
//       const symbol = coinData.symbol
//       const price = coinData.price
//       res.write("<h1>"+symbol+"</h1>")
//       res.write("<p>"+price+"</p>")
//       res.send()
//     })
//   })})