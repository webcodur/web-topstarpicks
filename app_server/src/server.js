const cors = require('cors');
const express = require('express');
const celebritiesRoutes = require('./routes_celebrities');
const recommendationsRoutes = require('./routes_recommendations');

const app = express();
const port = 4000;

app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

app.use(express.json());

// 라우트 사용
app.use('/api/celebrities', celebritiesRoutes);
app.use('/api/recommendations', recommendationsRoutes);

app.listen(port, () => {
	console.log(`서버가 포트 ${port}에서 시작되었습니다.`);
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
	console.error('서버 오류:', err.stack);
	res.status(500).send('서버 내부 오류가 발생했습니다.');
});
