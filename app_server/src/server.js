// 필요한 모듈 불러오기
const express = require('express');
const cors = require('cors');

// 라우터 파일 불러오기
const celebritiesRoutes = require('./routes_celebrities');
const recommendationsRoutes = require('./routes_recommendations');

// Express 애플리케이션 생성
const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

// API 라우트 설정
app.use('/api/celebrities', celebritiesRoutes);
app.use('/api/recommendations', recommendationsRoutes);

// 글로벌 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
	console.error('서버 오류:', err.stack);
	res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
});

// 서버 시작
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

module.exports = app;
