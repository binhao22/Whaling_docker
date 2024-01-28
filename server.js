const express = require('express')
const axios = require('axios')
var path = require('path')
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.listen(7979, () => {
    console.log('http://localhost:7979 에서 서버 실행 중 ..')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// Docker API 엔드포인트:
const dockerApiUrl = 'http://localhost:2375';

// /containers GET 요청, Docker API 로부터 컨테이너 리스트를 반환.
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
      res.status(400).json({ error: 'Missing containerId' })
      return
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

// 컨테이너 CPU 사용량 조회 func
app.get('/containers/:containerId/stat', async (req, res) => {
    const containerId = req.params.containerId;
    try {
        const response = await axios.get(`${dockerApiUrl}/containers/${containerId}/stats?stream=false`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        if (response.status === 200) {
            const data = response.data;
            res.json(data);
        } else {
            res.status(response.status).json({ error: 'Failed to fetch container stats' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});
